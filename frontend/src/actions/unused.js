export const helperIdNewToken = () => dispatch => {
    console.log("Helper button pressed")
    dispatch({ type: HELPER_ID_NEW_TOKEN_START });
    return axios
      .post(`${API}/helpers`)
      .then(res => {
        console.log("Helpers ID or whatever", res)
        axios.put({
          headers: {
            Authorization: res.data.token
          }
      })
      .catch(err => {
       console.log("Hahahah!", err)
      })
    })
  };