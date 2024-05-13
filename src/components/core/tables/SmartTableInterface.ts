import { SmartButtonProps } from "../forms/SmartFormInterface";

export interface SmartSoftColumnConfig {
    title: string,
    type?:string,
    titleFunction:(handleSort:any,handleFilter:any)=>any,
    index: string,
    valueFunction?:(data:any)=>any,
    isSortable?:boolean,
    classHead?:string,
    classBody?:string,
    dateFormat?:string,
    tags?:any,
    imageIndex?:string,
    imageIndexFunction?:(data:any)=>any,
    progressMax?:number,
    progressClass?:string,
    buttons?:SmartButtonProps[],
    width?:string
  }

  export interface SmartSoftFooterConfig{
    className?:string,
    footerType:string,
    footerFunction:(pageCount?:any,setCurrentPage?:any,setPageSizeHandle?:any,startIndex?:any,endIndex?:any,dataLength?:any)=>any
  }


  
  export interface SmartSoftTablePaginationProps {
    classList: string[],
    pageSize: number,
    navigationIcon?:string
  }
  
  export interface SmartSoftDataRow {
    [key: string]: string | number;
  }
  
  export interface SmartSoftTableMainProps{
    className?:string
  }
  
  export interface SmartSoftTableProps {
    columns: SmartSoftColumnConfig[];
    data: SmartSoftDataRow[];
    tableProps?:SmartSoftTableMainProps,
    paginationProps?: SmartSoftTablePaginationProps,
    footerConfig?:SmartSoftFooterConfig[]
  }

  export interface SmartPaginationProps {
    currentPage: number,
    setCurrentPage: (value: number) => void,
    classList?: string[],
    totalPages: number,
    navigationIcon?:string
}