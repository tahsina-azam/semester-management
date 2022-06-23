export default async function handler(req, res) {
    localStorage.removeItem("token")
    console.log("token removed")
    console.log(localStorage.getItem("token"))
    res.redirect(444,"/sign-in")
}