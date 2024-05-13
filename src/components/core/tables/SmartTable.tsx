import React, { useState, useMemo } from 'react';
import SmartPagination from './SmartPagination';
import "./SmartTableCss.css";
import { formatDate } from '../../../services/core/CommonService';
import { SmartSoftColumnConfig, SmartSoftDataRow,SmartSoftTableProps } from './SmartTableInterface';
import SmartButton from '../forms/SmartButton';



const SmartTable: React.FC<SmartSoftTableProps> = (props) => {
  const {
    columns,
    data,
    tableProps,
    paginationProps,
    footerConfig
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(paginationProps?.pageSize || 10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterConfig, setFilterConfig] = useState<{ key: string; value: string } | null>(null);

  const sortedData = useMemo(() => {
    let sorted = [...data];

    if (sortConfig) {
      sorted.sort((a, b) => {
        const key = sortConfig.key;
        if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    if (filterConfig) {
      const { key, value } = filterConfig;
      sorted = sorted.filter(item => String(item[key]).toLowerCase().includes(value.toLowerCase()));
    }

    return sorted;
  }, [data, sortConfig, filterConfig]);

  const pageCount = Math.ceil(sortedData.length / pageSize);


  const handleSort = (key: string) => {
    if (sortConfig && sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({
        key,
        direction: 'asc',
      });
    }
  };

  const setPageSizeHandle=(size:number)=>{
    setCurrentPage(1);
    setPageSize(size)
  }

  const handleFilter = (key: string, value: string) => {
    setFilterConfig({ key, value });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const visibleData = useMemo(() => {
    //  const startIndex = (currentPage-1) * pageSize;
    //const endIndex = startIndex + pageSize;
    // console.log("start " , startIndex, " end =" , endIndex," Current Page " , currentPage, "page Size " , pageSize);
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, startIndex, endIndex]);

  const handleSortColumn=(column:SmartSoftColumnConfig)=>{
    if(column.isSortable){
      handleSort(column.index);
    }
  }

  const displaySortingArrow=(index:string)=>{
    let direction = "desc";
    if (sortConfig && sortConfig.key === index) {
        direction = sortConfig.direction;
    }
    return direction==='asc' ? <span className="icon"><i className='fa fa-arrow-down'></i></span> 
     : <span className="icon"><i className='fa fa-arrow-up'></i></span>
  }

  const tableHeadTdClasses=(column:SmartSoftColumnConfig)=>{
    let class_list = ["smart-table-column-" + column.index];
    if(column.width){
      class_list.push("smart-table-column-width-"+column?.width)
    }
    if(column.classHead){
      class_list.push(column.classHead);
    }
    return class_list.join(" ");
  }

  const tableHeadDisp = () => {
    return (
      <thead>
        <tr>
          {columns.map((column,index) => (

            <th
              key={column.index+"_"+index}
              onClick={() => handleSortColumn(column)}
              className={tableHeadTdClasses(column)}            
            >
              {column.titleFunction ? column.titleFunction(handleSort,handleFilter) : column.title}
              {column.isSortable && displaySortingArrow(column.index)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
  
 const getValue=(column:SmartSoftColumnConfig, row:SmartSoftDataRow)=>{
   if(column.valueFunction){
     return column.valueFunction(row);
   }else{
     return row[column.index]!==undefined ? row[column.index] : null;
   }
 }

 const tagsDisplay=(column:SmartSoftColumnConfig,value:any)=>{
     let tags = Array.isArray(column?.tags) ? column?.tags : [];
     for(let i=0;i<tags.length;i++){
        if(tags[i].value && tags[i].value===value){
            return <span className={'tag ' + tags[i].class}>{tags[i].label ? tags[i].label : tags[i].value}</span>
        }
     }
     return "";
 }

 const profileCardDisplay=(column:SmartSoftColumnConfig,value:any)=>{
    
 }

 const progressDisplay=(column:SmartSoftColumnConfig,value:any)=>{
    return <progress className={"progress " + column.progressClass ? column.progressClass : "is-primary"}
     value={value} max={column.progressMax ? column.progressMax : 100 }>{value+"%"}</progress>
 }

 const displayButtons=(column:SmartSoftColumnConfig,row:SmartSoftDataRow)=>{
   let buttons = column.buttons && Array.isArray(column.buttons) ? column.buttons : [];
   return buttons.map((item,index)=>{
     let hide = item.hideFunction ? item.hideFunction(row) : false;
     let onClick = ()=>item.onClick(row);        
     return (!hide && <SmartButton key={index} {...item} onClick={onClick}  /> )
   })
 }

 const actionButton=(column:SmartSoftColumnConfig,row:SmartSoftDataRow)=>{
  return <div className="smart-action-tooltip-button">
      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
      <div className="smart-action-buttons">
        {displayButtons(column,row)}
      </div>
  </div>
 }

 const displayBodyCell=(column:SmartSoftColumnConfig,row:SmartSoftDataRow,rowIndex:number)=>{
     const value = getValue(column,row);
     switch(column.type){
        case "sno"  : return startIndex + rowIndex + 1;
        case "date" : return formatDate(value,column.dateFormat || "MM-DD-YYYY");
        case "tags" : return tagsDisplay(column,value);
        case "progress" : return progressDisplay(column,value);
        case "buttons" : return displayButtons(column,row);
        case "action" : return actionButton(column,row);
        default : return value;
     }
 }

 const defaultFooterConfig=()=>{
    return [
      {
        className:"is-6 p-5",
        footerType:"SHOW_ENTRIES"
      },
      {
        className:"is-6",
        footerType:"PAGINATION"
      }
    ]
 }

 const showEntries=()=>{
 return  <> showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries </>
 }

 const paginationDisplay=()=>{
  return   <SmartPagination currentPage={currentPage}
  setCurrentPage={setCurrentPage} totalPages={pageCount} navigationIcon={paginationProps?.navigationIcon} />
 }

 const singleFooter=(item:any)=>{
    switch(item.footerType){
      case "SHOW_ENTRIES" : return showEntries()
      case "PAGINATION" : return paginationDisplay()
      case "FUNCTION" : return item.footerFunction(pageCount,setCurrentPage,setPageSizeHandle,startIndex,endIndex,sortedData.length)
      default : return "";
    }
 }

 const singleFooterDisplay=(index:any,item:any)=>{
  const class_list = ["column"];
  if(item?.className){
     class_list.push(item.className);
  }
  return (
    <div key={index} className={class_list.join(" ")}> 
      {singleFooter(item)}
    </div>
  )
 }


 const footerDisplay=()=>{
    const footerConfigFinal = footerConfig ? footerConfig : defaultFooterConfig();
    return footerConfigFinal.map((item,index)=>{
      return singleFooterDisplay(index,item);
    })
 }



  return (
    <div>
      <table className={'table is-fullwidth smart-table ' + tableProps?.className }>
        {tableHeadDisp()}
        <tbody>
          {visibleData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column,colIndex) => (
                <td key={column.index+"+"+colIndex} className={column?.classBody}>
                  {displayBodyCell(column,row,rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='columns is-multiline p-0'>
        {footerDisplay()}       
      </div>
    </div>
  );
};

export default SmartTable