//Showing login form
app.get("/login", function (req, res) {
res.render('login', {
title: 'Login',
email: '',
password: ''     
})
});