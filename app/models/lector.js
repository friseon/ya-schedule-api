module.exports = function(params) {
	this.id = params.id;
    this.name = params.name;
    this.lastname = params.lastname;
    this.description = params.description || "";
    this.fullname = function() {
    	return this.lastname + " " + this.name
    };
}