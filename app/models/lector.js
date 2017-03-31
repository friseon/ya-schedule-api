module.exports = function(params) {
    this.name = params.name;
    this.lastname = params.lastname;
    this.description = params.description || "";
    this.fullname = function() {
    	return this.lastname + " " + this.name
    };
}