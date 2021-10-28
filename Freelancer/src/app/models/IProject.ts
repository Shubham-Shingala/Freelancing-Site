export interface IProject{
    _id:string,
    Name:string,
    Description:string,
    FilePath:string,
    Category:string,
    MinBudget:number,
    MaxBudget:number,
    _User:string,
    Duration:string,
    Status:string,
    ProjectPostTime:Date,
    NumberOfBids:number,
    completedWorkFile?:string
}