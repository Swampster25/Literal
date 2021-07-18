import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' 
import popper from 'popper.js'
global.Popper = popper 
import './main.html';
import '../lib/collection.js';


Template.booksLib.helpers({
  allBooks() {
     var prevTime = new Date().getTime() -12000;
    var results = booksdb.find ({createdon: {$gte:prevTime}}).count();
    if (results > 0)
      return booksdb.find({}, {sort:{createdon: -1, upvote: -1} });
    else
      return booksdb.find({}, {sort:{upvote: -1,createdon: -1} });
  },
   
});


Template.myJumbo.events({
	'click .js-addImage'(event, instance){
    console.log("Open modal");
 	 },
  	'click .js-exitAdd'(event, instance){
   
    $("#bName").val("");
    $("bAuth").val("");
    $("#path").val("");
    $("#desc").val("");
    $(".placeHolder").attr("src","imgPlaceHolder.png");
  },

	'click .js-save'(event, instance){
		var booktitle = $('#bName').val();
    var bookAuthor = $('#bAuth').val();
		var imgpath = $ ('#path').val();
		var bdesc = $ ('#desc').val();
    var thebrath = $ ('#brath').val();
    var Views6 = 0;
    var Numlike =0;
    var Dislike =0;
		booksdb.insert ({
			"bName" : booktitle,
      "bAuth" : bookAuthor,
			"path" : imgpath,
			"desc" : bdesc,
      "brath" : thebrath,
      "viewst" : Views6,
      "upvote" :Numlike,
      "downvote" :Dislike,
      "Createdon" : new Date().getTime()

		});

	
    $("#addImageModal").modal("hide");
    $("#bName").val("");
    $('#bAuth').val("");
    $("#path").val("");
    $("#desc").val("");
    $(".placeHolder").attr("src","imgPlaceHolder.png");
  },
  'input #path'(event, instance){
    $(".placeHolder").attr("src",$("#path").val());
    
	}
	
});

Template.mainBody.events({
'click .js-downdown'(event,instance){
   var myID = this._id;
    var Dislike = booksdb.findOne({_id: myID}).downvote;

    Dislike += 1;
    booksdb.update({_id:myID},
  {$set:{
    "downvote":Dislike
  }}
  )
},





'click .js-upup'(event,instance){
    var myID = this._id;
    var Numlike = booksdb.findOne({_id: myID}).upvote;

    Numlike += 1;
    booksdb.update({_id:myID},
  {$set:{
    "upvote":Numlike
  }}
  )

},

'click .js-view'(event, instance){
  $("#viewBook").modal('show');
  var myID = this._id;
  var Views6 = booksdb.findOne({_id: myID}).viewst;
  $('#viewContent').html(booksdb.findOne({_id:myID}).desc);
  
  Views6 += 1;
  booksdb.update({_id:myID},
  {$set:{
    "viewst":Views6
  }}
  )

},

'click .js-delete'(event,instance){
  var myID=this._id;
  $("#"+this._id).fadeOut('slow',function(){
    booksdb.remove({_id:myID});
    
    
  });
  
    $("#viewBook").modal("hide");
},

  'input #path'(event, instance){
     
    $(".brath").attr("scr",$("#path").val());
  },


'click .js-edit'(event,instance){
  $('#editbookModal').modal('show');

  var myId = this._id;
    
    var editName = booksdb.findOne({_id: myId}).bName;
    var editId = booksdb.findOne ({_id:myId}).editId;
    var editAuth = booksdb.findOne({_id: myId}).bAuth;
    var editpath = booksdb.findOne({_id: myId}).path;
    var editdesc = booksdb.findOne({_id: myId}).desc;
    
    $("#editId").val(myId);
    $("#editName").val(editName);
    $("#editAuth").val(editAuth);
    $("#editpath").val(editpath);
    $("#editdesc").val(editdesc);
    $(".editHolder").attr("src", editpath);
},
  'click .js-editsave'(event,instance){
     var editName = $("#editName").val();
     var editAuth = $("#editAuth").val();
    var editpath = $("#editpath").val();
    var editdesc = $("#editdesc").val();
    var updateId = $("#editId").val();
    
   
    booksdb.update({_id: updateId},
      {$set:{
        "bName": editName,
        "bAuth": editAuth,
        "path": editpath,
        "desc": editdesc
      }}
    );
    
  }
    
  });

Template.booksLib.onCreated(function mainBodyCreated(){
  this.viewst = new ReactiveVar(0);
  
});

