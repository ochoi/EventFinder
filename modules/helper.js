module.exports = {
	// reduce repetitive code about rendering the same thing
	workRender: function (err, res) {
		if (err) return res.render('error');
		else res.render('success');
	}
};