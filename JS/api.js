(() => {
  // Set API URL globally if not already defined
  if (!window.HOSTILY_API_URL) {
      window.HOSTILY_API_URL = 'http://localhost:3000'; // Fallback if not set elsewhere
  }

  const BASE_URL = window.HOSTILY_API_URL;

  /**
   * pushData (POST)
   * @param {string} endpoint - API endpoint (e.g., "/api/rooms")
   * @param {object} data - Body payload for the POST request
   */
  async function pushData(endpoint, data) {
      const url = `${BASE_URL}${endpoint}`;
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
          });
          return await handleResponse(response);
      } catch (error) {
          console.error('Error in pushData:', error);
          throw error;
      }
  }

  /**
   * pullData (GET)
   * @param {string} endpoint - API endpoint (e.g., "/api/rooms")
   */
  async function pullData(endpoint) {
      const url = `${BASE_URL}${endpoint}`;
      try {
          const response = await fetch(url);
          return await handleResponse(response);
      } catch (error) {
          console.error('Error in pullData:', error);
          throw error;
      }
  }

  /**
   * fetchData (GET)
   * @param {string} endpoint - API endpoint (e.g., "/api/rooms")
   */
  async function fetchData(endpoint) {
      const url = `${BASE_URL}${endpoint}`;
      try {
          const response = await fetch(url);
          return await handleResponse(response);
      } catch (error) {
          console.error('Error in fetchData:', error);
          throw error;
      }
  }

  /**
   * patchData (PATCH)
   * @param {string} endpoint - API endpoint (e.g., "/api/rooms/:id")
   * @param {object} data - Body payload for the PATCH request
   */
  async function patchData(endpoint, data) {
      const url = `${BASE_URL}${endpoint}`;
      try {
          const response = await fetch(url, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
          });
          return await handleResponse(response);
      } catch (error) {
          console.error('Error in patchData:', error);
          throw error;
      }
  }

  /**
   * deleteData (DELETE)
   * @param {string} endpoint - API endpoint (e.g., "/api/rooms/:id")
   */
  async function deleteData(endpoint) {
      const url = `${BASE_URL}${endpoint}`;
      try {
          const response = await fetch(url, {
              method: 'DELETE'
          });
          return await handleResponse(response);
      } catch (error) {
          console.error('Error in deleteData:', error);
          throw error;
      }
  }

  /**
   * handleResponse - small helper to parse JSON and handle non-OK status
   * @param {Response} response
   */
  async function handleResponse(response) {
      if (!response.ok) {
          let errorMsg = `HTTP error! status: ${response.status}`;
          try {
              const errorData = await response.json();
              if (errorData && errorData.message) {
                  errorMsg = errorData.message;
              }
          } catch (_) {}
          throw new Error(errorMsg);
      }
      return response.json(); // Parse success data
  }

  // Expose these methods globally
  window.Api = {
      pushData,
      pullData,
      fetchData,
      patchData,
      deleteData
  };
})();
