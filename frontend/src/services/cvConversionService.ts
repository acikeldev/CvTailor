import type { HarvardCvModel, CvEnhancementResponse } from '../models/HarvardCvModel';

const API_BASE_URL = 'http://localhost:5162/api';

export class CvConversionService {
  static async convertToHarvardFormat(cvText: string): Promise<HarvardCvModel> {
    try {
      console.log('Sending request to backend with CV text length:', cvText.length);
      
      const response = await fetch(`${API_BASE_URL}/cvconversion/convert-to-harvard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cvText }),
      });

      console.log('Backend response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Backend response:', result);
      return result;
    } catch (error) {
      console.error('Error converting CV to Harvard format:', error);
      throw error;
    }
  }

  static async updateWithSuggestions(cv: HarvardCvModel, suggestions: string[]): Promise<CvEnhancementResponse> {
    try {
      console.log('Sending CV update request with suggestions:', suggestions);
      const response = await fetch(`${API_BASE_URL}/cvconversion/update-with-suggestions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cv, suggestions }),
      });

      console.log('Backend response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      console.log('Backend response:', result);
      return result;
    } catch (error) {
      console.error('Error updating CV with suggestions:', error);
      throw error;
    }
  }

  static async exportToPdf(cv: HarvardCvModel): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/cvconversion/export-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cv),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.pdfUrl;
    } catch (error) {
      console.error('Error exporting CV to PDF:', error);
      throw error;
    }
  }
} 