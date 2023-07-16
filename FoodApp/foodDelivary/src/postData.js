export function postData(data){
fetch("http://localhost:8888/user/delivery", {
  method: "POST",
  body: JSON.stringify({
  data:data
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
}