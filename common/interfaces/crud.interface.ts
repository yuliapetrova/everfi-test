export interface CRUD {
    list: (upperCase: string) => Promise<any>,
    create: (resource: any) => Promise<any>,
    deleteByName: (name: any) => Promise<string>,
}
