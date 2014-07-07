describe("hello-protractor", function () {

  describe("index", function () {
  
	var ptor;
  
	beforeEach(function () { 
		ptor = protractor.getInstance();
		ptor.get("/");
	});
  
    it("should display the correct title", function () {
      // in the video, I used the protractor.getInstance() which was removed shortly thereafter in favor of this browser approach      
      expect(ptor.getTitle()).toBe('Test 123');
    });
	
	it("should dial numbers", function () {		
		ptor.findElement(protractor.By.id('numBtn4')).then(function (btn) {
			btn.click();
		});
		
		ptor.findElement(protractor.By.id('numBtn1')).then(function (btn) {
			btn.click();
		});
		
		ptor.findElement(protractor.By.id('numBtn2')).then(function (btn) {
			btn.click();
		});
		
		ptor.sleep(300);
		
		ptor.findElement(protractor.By.id('number2Dial')).getText().then(function (text) {			
			expect(text).toContain('412');
		});
	});
	
  });
});