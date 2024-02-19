const getTranslations = async (locale: string): Promise<{ [key: string]: string }> => {
    try {
        console.log(`getting ${locale}.json`);
        
      const translations = await import(`../_assets/${locale}.json`);
      return translations.default;
    } catch (error) {
      console.error('Error loading translations:', error);
      return {}; // Return empty object in case of error
    }
  };
  
  export default getTranslations;
  