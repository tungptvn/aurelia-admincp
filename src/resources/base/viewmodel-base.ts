export interface ViewModelBase<T> {
    items: Array<T>
    selectedItem: T
    selectedList: Array<T>
    filter: any
    runFilter()
    runCreate()
    runUpdate()
    runDelete()
    runDeleteMany()


}