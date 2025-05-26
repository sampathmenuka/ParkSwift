import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader2, BarChart2, Calendar, DollarSign, Download as DownloadIcon } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const Earnings = () => {

  const {backendUrl} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [earnings, setEarnings] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    averagePerBooking: 0,
    earningsList: [],
    weeklyEarnings: 0,
    pendingPayout: 0,
    lastPayout: { amount: 0, date: ''}
  });

  const getEarnings = async () => {

    setLoading(true);
    
    try {
      const {data} = await axios.get(backendUrl + '/api/owner/earnings')

      if (data.success) {
        setEarnings(data.data)
      } else {
        toast.error(data.message)
      }

      setLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
  }

  const handleWithdraw = async () => {
    const { data } = await axios.post(backendUrl + '/api/owner/withdraw');

    if (data.success) {
      toast.success(data.message)
    } else {
        toast.error(data.message)
    }

    getEarnings();
  };

  useEffect(() => {
    getEarnings()
  }, []);

  const exportToPDF = () => {
    const input = document.getElementById('earnings-section');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('earnings-report.pdf'); }
    );
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-gray-600" />
        <span className="ml-2 text-gray-600">Loading earnings...</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Earnings Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className='border rounded shadow-sm p-4 bg-green-50'>
          <div className='flex items-center justify-between mb-3'>
            <p className="text-sm text-gray-600 font-medium">
              Total Revenue
            </p>
            <div className="p-2 rounded-full bg-green-200">
              <DollarSign className="h-5 w-5 text-green-700" />
            </div>
          </div>
          
          <p className="text-xl font-bold text-green-600">
            LKR {earnings.totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className='border rounded shadow-sm p-4 bg-indigo-50'>
          <div className='flex items-center justify-between mb-3'>
            <p className="text-sm text-gray-600 font-medium">
              Total Bookings
            </p>
            <div className="p-2 rounded-full bg-indigo-200">
              <Calendar className="h-5 w-5 text-indigo-700" />
            </div>
          </div>
          
          <p className="text-xl font-bold text-indigo-600">
            {earnings.totalBookings}
          </p>
        </div>

        <div className='border rounded shadow-sm p-4'>
          <div className='flex items-center justify-between mb-3'>
            <p className="text-sm text-gray-600 font-medium">
              Average Per Booking
            </p>
            <div className="p-2 rounded-full bg-purple-200">
              <BarChart2 className="h-5 w-5 text-purple-700" />
            </div>
          </div>
          
          <p className="text-xl font-bold">
            LKR. {earnings.averagePerBooking.toFixed(2)}
          </p>
        </div>

        <div className='border rounded shadow-sm p-4'>
          <div className='flex items-center justify-between mb-3'>
            <p className="text-sm text-gray-600 font-medium">
              Pending Payout
            </p>
            <button onClick={handleWithdraw} className="py-1.5 px-3 rounded bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-300">
              Withdraw
            </button>
          </div>
          
          <p className="text-xl font-bold">
            LKR. {earnings.pendingPayout.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            Last payout: ${earnings.lastPayout.amount} on {earnings.lastPayout.date}
          </p>
        </div>
      </div>

      <div id="earnings-section" className="bg-white p-4 rounded-md shadow border">
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h3 className="text-xl font-bold text-gray-700">
              Earnings Overview (Weekly)
            </h3>
            <p className='text-sm text-gray-600'>
              See how your earnings are trending
            </p>
          </div>
          
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded shadow-sm flex items-center gap-2 transition-all duration-300" onClick={exportToPDF}>
            <DownloadIcon className='w-4 h-4' />
            <span>Export as PDF</span>
          </button>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earnings.weeklyEarnings}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="earnings" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Earnings
