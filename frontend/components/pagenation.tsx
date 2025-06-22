import React from 'react';

type props = {
    currentPage:number,
    setCurrentPage: (value:number)=>void,
    total_event_list: number ,
    record_per_page:number ,
}

export default function Pagination({...Props}:props){
    const total_pages = Math.ceil((Props?.total_event_list / 10))

  const handlePrev = async () => {
    if (Props.currentPage > 1) {
      Props.setCurrentPage(Props.currentPage - 1);
    }

  };
  const handleNext = async () => {
    Props.setCurrentPage(Props.currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs font-normal">Showing {(Props.currentPage - 1) * 10 + 1} to {(Props.currentPage -1 ) *(10) + Props?.record_per_page} of {Props.total_event_list} entries</p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <button onClick={handlePrev} className={`bg-white border border-[#e5e7eb] rounded-md py-2 px-4 hover:bg-gray-50 disabled:bg-gray-100 ${Props.currentPage == 1 ? 'cursor-not-allowed disabled bg-opacity-50' : 'cursor-pointer'}`} disabled={Props.currentPage == 1 ? true : false}>
            Previous
          </button>
          <button onClick={handleNext} className={`bg-white border border-[#e5e7eb] rounded-md py-2 px-4 hover:bg-gray-50 disabled:bg-gray-100 ${Props.currentPage == total_pages || (Props.total_event_list == 0)  ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={Props.currentPage == total_pages || (Props.total_event_list == 0)  ? true : false}>
            Next
          </button>
        </div>
      </div>
  )
}

