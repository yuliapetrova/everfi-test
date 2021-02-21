export interface CRUD {
    list: (upperCase: boolean) => Promise<any>,
    create: (resource: any) => Promise<any>,
    deleteByName: (name: any) => Promise<string>,
}
