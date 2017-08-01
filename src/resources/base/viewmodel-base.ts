export interface ViewModelBase<T> {
    entityList: Array<T>
    selected: T
    selectedList: Array<T>
    filter: any
    runFilter()
    runCreate()
    runUpdate()
    runDelete()
    runDeleteMany()


}