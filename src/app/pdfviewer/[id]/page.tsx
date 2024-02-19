"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { Order } from '../../_models/orderexport';
import "../../_assets/loading.scss";
import axios from 'axios';
import { AxiosError } from 'axios';

interface Props {
  params: {
    id: string;
  };
}

const Page: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [pdfData, setPdfData] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/documents/orderPDF/${id}`, {
          responseType: 'blob', // Set response type to blob
        });
        const pdfBlob = response.data;
        // Convert blob to base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result?.toString() || '';
          setPdfData(base64Data);
        };
        reader.readAsDataURL(pdfBlob);
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error (e.g., show a custom message)
          setError('PDF not found.');
          router.replace(`/documents`)
        } else {
          // Handle other errors
          setError('Error fetching PDF. Please try again later.');
          router.replace(`/documents`)
        }
        console.error('Error fetching PDF:', error);
        router.replace(`/documents`)
    }
    };

    fetchPDF();
  }, [id]);

 

  return (
    <div>
      
      {pdfData && <embed src={pdfData} type="application/pdf" width="100%" height="600px" />}
    </div>
  );
};
  

export default Page;