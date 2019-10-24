export interface Instance {
  uuid: string;
  equals(instance: Instance);
}

export abstract class AbstractInstance implements Instance {
  uuid: string;

  protected constructor(uuid: string) {
    this.uuid = uuid;
    InstancesList.ALL.push(this);
  }

  abstract toString(): string;

  equals(instance: Instance) {
    if(instance == null) return false;
    return this.uuid === instance.uuid;
  }

}

export class InstancesList<T extends Instance> {

  protected list: T[] = [];

  public static ALL: InstancesList<Instance> = new InstancesList<Instance>();


  public push(instance: T): this {
    let index = this.indexOf(instance);
    if(index != null)
      this.list.splice(index, 1);

    this.list.push(instance);
    return this;
  }

  public clean() {
    this.list = [];
  }

  public getByUUID(instance: string | Instance): T {
    let uuid: string = typeof instance === 'string' ? instance : instance.uuid;
    return this.list.find(t => t.uuid === uuid);
  }

  private indexOf(instance: T): number {
    for(let i = 0; i < this.list.length; i++)
      if (this.list[i].equals(instance))
        return i;

    return null;
  }

  public remove(instance: T | string): boolean {
    instance = typeof instance === 'string' ? this.getByUUID(instance) : instance;
    let index = this.list.indexOf(instance);
    if(index == null)
      return false;
    this.list.splice(index, 1);
    return true;
  }

  get array(): T[] {
    return this.list;
  }

  public contains(object: T | string): boolean {
    let uuid: string = typeof object === 'string' ? object : object.uuid;

    return this.getByUUID(uuid) != null;
  }

  public size(): number {
    return this.list.length;
  }

  public concat(collection: InstancesList<T>): InstancesList<T> {
    let result: InstancesList<T> = new InstancesList();
    this.list.forEach(i => result.push(i));
    collection.list.forEach(i => result.push(i));
    return result;
  }


}
