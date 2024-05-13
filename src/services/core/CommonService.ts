import moment from 'moment';
const isEmptyObject = (obj:any) => {
    return Object.keys(obj).length === 0;
};

const formatDate = (dateString:string, format:string) => {
    try {
      const formattedDate = moment(dateString).format(format);
      return formattedDate;
    } catch (error) {
      // If an error occurs (e.g., invalid date), return the original string
      return dateString;
    }
  };

export{
    isEmptyObject,
    formatDate
}