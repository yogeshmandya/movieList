var paginationLength;
/* * * * * * * * * * * * * * * * *
 * Pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */

var Pagination = {

    code: '',

    // --------------------
    // Utility
    // --------------------

    // converting initialize data
    Extend: function(data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },

    // add pages by number (from [s] to [f])
    Add: function(s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<span class="a-no">' + i + '</span>';
        }
    },

    // add last page with separator
    Last: function() {
        Pagination.code += '<i>...</i><span class="a-no">' + Pagination.size + '</span>';
    },

    // add first page with separator
    First: function() {
        Pagination.code += '<span class="a-no">1</span><i>...</i>';
    },



    // --------------------
    // Handlers
    // --------------------

    // change page
    Click: function() {
        Pagination.page = +this.innerHTML;
        cardList.paginationLoader(Pagination.page);
        Pagination.Start();
    },

    // previous page
    Prev: function() {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        cardList.paginationLoader(Pagination.page);
        Pagination.Start();
    },

    // next page
    Next: function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        cardList.paginationLoader(Pagination.page);
        Pagination.Start();
    },



    // --------------------
    // Script
    // --------------------

    // binding pages
    Bind: function() {
        var a = Pagination.e.getElementsByClassName('a-no');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) 
            a[i].classList.add('current');

            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    // write pagination
    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    // find pagination type
    Start: function() {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },



    // --------------------
    // Initialization
    // --------------------

    // binding buttons
    Buttons: function(e) {
        var nav = e.getElementsByClassName('a-no');
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },

    // create skeleton
    Create: function(e) {

        var html = [
            '<span class="a-no">&#9668;</span>', // previous button
            '<span class="pgnList"></span>',  // pagination container
            '<span class="a-no">&#9658;</span>'  // next button
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.querySelector('span.pgnList');
        Pagination.Buttons(e);
    },
    // init
    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();

    }

};

/* * * * * 8 8
Object for Creating html movie list objects and rendering on demand
* * * * * * * * */
var cardList = {
	
    
	//movie list object
    htmlObject: function(object){
    	
    	var parentId = document.getElementById("movieList");
    	
        /* Removing All Sequence cards*/
    	parentId.innerHTML = "";

    	var end = object.length;
    	
    	for (var i = 0 ; i < end ; i ++ ){
    		
            var imgUrl = object[i].Poster;
    		var movieTitle = object[i].Title;
    		var card_id = object[i].imdbID;
            
            /* variable holds user actions html parent object*/
            var user_actions = '<div class="usr-action--wrap"><div class="col like-card"><span class="like-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><path id="a" d="M0 0h24v24H0z"/><path id="c" d="M19 6.807V16H9.665C7.09 16 5 13.89 5 11.289c0-2.602 2.09-4.711 4.666-4.711h.003C9.74 4.038 11.801 2 14.334 2s4.594 2.037 4.664 4.578l.001.037a4.85 4.85 0 0 1 0 .192z"/></defs><g fill="none" fill-rule="evenodd"><g mask="url(#b)" transform="rotate(45 12 9)"><use fill="#F41037" fill-opacity="0" xlink:href="#c"/><path stroke="#3C3C3C" d="M18.5 15.5V6.797v-.086-.084l-.002-.036C18.436 4.316 16.59 2.5 14.334 2.5s-4.102 1.816-4.165 4.091l-.013.487h-.49c-2.3 0-4.166 1.884-4.166 4.21 0 2.328 1.866 4.212 4.166 4.212H18.5z"/></g></g></svg></span><span class="like-text"> Like </span></div><div class="col share-card"><span class="share-icon"> <svg class="share-visible--handler" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 28 28"><g><line fill="none" stroke="#3C3C3C" x1="10.6" y1="12.3" x2="18.4" y2="8.5"/><line fill="none" stroke="#3C3C3C" x1="18" y1="19.5" x2="10.5" y2="15.7"/><path fill="none" stroke="#3C3C3C" d="M18.1,19.5c0.6-1,1.7-1.7,2.9-1.7c1.9,0,3.4,1.5,3.4,3.4c0,1.9-1.5,3.4-3.4,3.4 c-1.9,0-3.4-1.5-3.4-3.4C17.6,20.5,17.8,20,18.1,19.5"/><circle fill="none" stroke="#3C3C3C" cx="21" cy="6.7" r="3.4"/><circle fill="none" stroke="#3C3C3C" cx="7.6" cy="13.9" r="3.4"/></g></svg></span><span class="share-text"> Share</span></div></div>';
    		
            /* this variable holds a singlr ojrct of movie card*/
            var html = '<div class="col c25"><div class="movie-list--wrapper"><div class="m-l-crd s2-cover-shadow"><div class="m-l-title"><h4 class="text-wrap-hide">'+movieTitle+'</h4></div><div  data-card-id='+card_id+' class="loading"><img id="imag_'+card_id+'" onerror=replaceBreakImg("imag_'+card_id+'") width="100%" src='+imgUrl+' alt="'+movieTitle+'" class="image-class"></div>'+user_actions+'</div></div></div>';
    		
            /* insering each card into its parent*/
            parentId.innerHTML += html;

		}
        /* Image Placement Beacause images are deferent 
        This could be achivable even better once we use cloudinary*/
        var parentHeight = cardList.imageHeightSet();
		var image = document.getElementsByClassName("image-class");
            for(j=0;j<image.length;j++){
                image[j].onload = function(){
                    if(parentHeight > this.clientHeight){
                     var marginSet = (parentHeight - this.clientHeight)/2;
                     this.style.margin =  marginSet+"px 0px";
                    }
                    
                }
               
            }
    },
    //loading the movie list based on page count
    paginationLoader: function(pageno) {
    	var xhr = new XMLHttpRequest();
	    var page = pageno;
	    var text = "hollywood";
	    xhr.open("GET", "http://www.omdbapi.com/?s="+text+"&page="+page+"&apikey=82e9bcaa",true); // true for assync 
	    xhr.onreadystatechange = function() {
	        if(xhr.readyState == 4 && xhr.status==200) {
              var chunk = xhr.responseText;
              var data = JSON.parse(chunk);
              if (data == "0") {
                  try{
                    document.getElementById("movieList").innerHTML = "<div class='error-message'> Something Went Wrong, Please stay we will Get Back Soon.</div>"
                  }catch(err){}
                }else{
                
                scrollTo(0 , 0);
                var moviList = data.Search;

                //render set os movie cards
				cardList.htmlObject(moviList);

				}
	        }
	    }
	    xhr.send();
    },
    imageHeightSet: function(){
    	var imageParentHeight = document.querySelectorAll(".loading")[0];
    	return imageParentHeight.offsetHeight;
    },
};

/* * * * * * * * * * * * * * * * *
* Pagination And Movie List Initialization
* * * * * * * * * * * * * * * * */

var init = function(pageLenth,moviList) {

	//render set os movie cards
	cardList.htmlObject(moviList);
    Pagination.Init(document.getElementById('pagination'), {
        size: pageLenth, // pages size
        page: 1,  // selected page
        step: 3   // pages before and after current
    });
    
};

/* * * * * * * * * *
* Replacing breaking images or Images with N/A with default
* * * * * * * */
var replaceBreakImg = function(id){
    document.getElementById(id).src ="https://images-na.ssl-images-amazon.com/images/M/MV5BMTIxMDg2MDk3OF5BMl5BanBnXkFtZTcwMzcxMTIzMQ@@._V1_SX300.jpg";
};

/* * * * * *  * *
* Immediately Invoked Function Expression to bring first set of movie list through API
* * * * * * */
(function(){
	var xhr = new XMLHttpRequest();
    var page = 1;
    var text = "hollywood";
    xhr.open("GET", "http://www.omdbapi.com/?s="+text+"&page="+page+"&apikey=82e9bcaa",true); // true for assync 
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status==200) {
                  var chunk = xhr.responseText;
                  var data = JSON.parse(chunk);
                  if (data == "0") {
                      try{
                        
                      }catch(err){}
                    }else{
                    // round the length of pagination
    				paginationLength = Math.ceil(data.totalResults / data.Search.length);
    				var moviList = data.Search;

    				//Initialization pagination for loading movie list
    				init(paginationLength,moviList);

  					}
        }
    }
    xhr.send();

})();