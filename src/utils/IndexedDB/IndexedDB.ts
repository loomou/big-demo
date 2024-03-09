class IndexedDB {
  private db: IDBDatabase | null;
  private dbName: string;
  private storeName: string;
  private dbVersion: number;
  private index: number = -1;
  private currentIndex: number = -1;
  
  constructor(dbName: string, storeName: string, dbVersion?: number) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
    this.dbVersion = dbVersion || 2;
    this.initDB().then((db) => {
      const location = window.location;
      if (location.hash.includes('/preview')) return;
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.clear();
      request.onsuccess = () => {
        if (db) {
          db.close();
        }
      };
    });
  }
  
  private initDB(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.dbVersion);
      
      request.onupgradeneeded = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(this.storeName, { keyPath: 'index' });
      };
      
      request.onsuccess = (event: Event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  
  public openDatabase(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.dbVersion);
      
      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };
      
      request.onerror = () => {
        reject(request.error);
      };
    });
  }
  
  public addItem(item: any): Promise<void> {
    const db = this.db;
    
    if (!db) throw new Error('IndexedDBWrapper初始化失败');
    
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      
      const record = {
        index: this.currentIndex + 1,
        history: item,
      };
      
      const request = objectStore.add(record);
      
      request.onsuccess = () => {
        this.index++;
        this.currentIndex++;
        resolve();
      };
      
      request.onerror = () => {
        reject((request as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  }
  
  public getPrevItem(): Promise<any[]> {
    const db = this.db;
    
    if (!db) throw new Error('IndexedDBWrapper初始化失败');
    
    return new Promise<any>((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      if (this.currentIndex === -1) {
        return resolve('');
      }
      const request = objectStore.get(this.currentIndex - 1);
      
      request.onsuccess = () => {
        const item: any = (request as IDBRequest).result;
        this.currentIndex--;
        if (item) {
          resolve(item.history);
        } else {
          resolve('');
        }
      };
      
      request.onerror = () => {
        reject((request as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  }
  
  public getNextItem(): Promise<any[]> {
    const db = this.db;
    
    if (!db) throw new Error('IndexedDBWrapper初始化失败');
    
    return new Promise<any>((resolve, reject) => {
      if (this.currentIndex + 1 > this.index) {
        resolve('');
        return;
      }
      const transaction = db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.get(this.currentIndex + 1);
      
      request.onsuccess = () => {
        const item: any = (request as IDBRequest).result;
        if (item) {
          this.currentIndex++;
          resolve(item.history);
        } else {
          resolve('');
        }
      };
      
      request.onerror = () => {
        reject((request as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  }
  
  public getAllItems(): Promise<any[]> {
    const db = this.db;
    
    if (!db) throw new Error('IndexedDBWrapper初始化失败');
    
    return new Promise<any[]>((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readonly');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.getAll();
      
      request.onsuccess = () => {
        const items: any[] = (request as IDBRequest<any[]>).result;
        resolve(items);
      };
      
      request.onerror = () => {
        reject((request as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  }
  
  public async deleteItem(itemId: number): Promise<boolean> {
    const db = this.db;
    
    if (!db) throw new Error('IndexedDBWrapper初始化失败');
    
    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.delete(itemId);
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = () => {
        reject((request as IDBRequest).error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  }
  
  public async deleteRange() {
    const db = this.db;
    
    if (!db) throw new Error('IndexedDBWrapper初始化失败');
    
    return new Promise<void>(async (resolve, reject) => {
      const transaction = db.transaction([this.storeName], 'readwrite');
      const objectStore = transaction.objectStore(this.storeName);
      
      const arr = [];
      
      for (let i = this.currentIndex + 1; i <= this.index; i++) {
        arr.push(objectStore.delete(i));
      }
      
      Promise.all(arr).then(() => {
          this.index = this.currentIndex;
          resolve();
        }
      ).catch((e) => {
        reject(e);
      });
    });
  }
  
  public compare() {
    return this.index > this.currentIndex;
  }
  
  public async getHistoryList() {
    await this.openDatabase();
    return await this.getAllItems();
  }
  
  public async setHistoryRecord(record: any) {
    await this.openDatabase();
    if (this.compare()) {
      await this.deleteRange();
    }
    return await this.addItem(record);
  }
  
  public async delHistoryRecord(record: any) {
    await this.openDatabase();
    return await this.deleteItem(record.index);
  }
  
  public async getPrevHistoryRecord() {
    await this.openDatabase();
    return await this.getPrevItem();
  }
  
  public async getNextHistoryRecord() {
    await this.openDatabase();
    return await this.getNextItem();
  }
}

export const dbWrapper = new IndexedDB('bigDemo', 'history');
