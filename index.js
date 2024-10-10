let geocoder;

function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true
  });
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
      mapTypeControl: false,
    });
    directionsRenderer.setMap(map);
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement =
      document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      types: ["establishment"],
    };

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

    const autocomplete = new google.maps.places.Autocomplete(
      input,
      options
    );
    autocomplete.bindTo("bounds", map);

    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);

    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);

      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert(
          "No details available for input: '" + place.name + "'"
        );
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.

    biasInputElement.addEventListener("change", () => {
      if (biasInputElement.checked) {
        autocomplete.bindTo("bounds", map);
      } else {
        // User wants to turn off location bias, so three things need to happen:
        // 1. Unbind from map
        // 2. Reset the bounds to whole world
        // 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
        autocomplete.unbind("bounds");
        autocomplete.setBounds({
          east: 180,
          west: -180,
          north: 90,
          south: -90,
        });
        strictBoundsInputElement.checked = biasInputElement.checked;
      }

      input.value = "";
    });

    geocoder = new google.maps.Geocoder();

    let test1 = [[]];
    let placename = [[]];
    let a_marker = [];

    const i0 = document.getElementById("0");
    const i1 = document.getElementById("1");
    const i2 = document.getElementById("2");
    const i3 = document.getElementById("3");
    const i4 = document.getElementById("4");
    const i5 = document.getElementById("5");
    const i6 = document.getElementById("6");
    const i7 = document.getElementById("7");
    const i8 = document.getElementById("8");
    const placesList = document.getElementById("places");
    const dsee = document.getElementById("dsee");

    //
    marker.addListener("click", () => {
      hm = marker.getPosition()
      geocoder.geocode({ location: marker.getPosition() }, function (results, status) {
        if (status === "OK") {
            const place = results[0].place_id;

            console.log(place);
            qqq = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`
            fetch(qqq).then((response) => response.json())
              .then((data) => {
                prevBtn.style.display = 'inline-block';
                nextBtn.style.display = 'inline-block';
                dsee.style.display = 'block'
                if(data.result.photos == undefined){
                  i0.src = "";
                }
                else{
                  for(photonum = 0; photonum < data.result.photos.length; photonum++){
                    photoBox.push(`https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[photonum].photo_reference}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`)
                  }
                  i0.src = `https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[0].photo_reference}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`;
                }
                i1.innerHTML = data.result.name;
                if(data.result.rating == undefined){
                  i2.innerHTML = "별점: X"
                }
                else
                  i2.innerHTML = `별점: ${data.result.rating}`;
                if(data.result.reviews == undefined){
                  i3.innerHTML = "";
                  i4.innerHTML = "";
                  i5.innerHTML = "";
                  i6.innerHTML = "";
                  i7.innerHTML = "";
                  i8.innerHTML = "";
                  i3.style.display = 'none'
                  i4.style.display = 'none'
                  i5.style.display = 'none'
                  i6.style.display = 'none'
                  i7.style.display = 'none'
                  i8.style.display = 'none'
                }
                else{
                  i3.style.display = 'block'
                  i4.style.display = 'block'
                  i5.style.display = 'block'
                  i6.style.display = 'block'
                  i7.style.display = 'block'
                  i8.style.display = 'block'
                  i3.innerHTML = `작성자: ${data.result.reviews[0].author_name}`;
                  i4.innerHTML = ` ${data.result.reviews[0].text}`;
                  i5.innerHTML = `작성자: ${data.result.reviews[1].author_name}`;
                  i6.innerHTML = ` ${data.result.reviews[1].text}`;
                  i7.innerHTML = `작성자: ${data.result.reviews[2].author_name}`;
                  i8.innerHTML = ` ${data.result.reviews[2].text}`;
                }

                
                
              })
        }
      });
  })
  const sb = document.getElementById("sortR");

    const addbutton = document.getElementById("add");
    addbutton.addEventListener('click', addMaker);
    pq = 0;
    ct = 0;
    plannum = 0;
    count = 0;
    let labelnum = 1;
    let markerlist = [[]];
    const checkbox = document.getElementById("Direction");
    const walkD = document.getElementById("Walk");
    const menuBox =document.getElementById("rightClickMenu");
    const menuItems = document.getElementsByClassName("item");
    const selectBox = document.getElementById("selectBox");
    selectBox.addEventListener("change", function() {
      changenum(selectBox)
      checkbox.checked = false;
      let event = new Event("change");
      checkbox.dispatchEvent(event);
      walkD.checked = false;
      walkD.dispatchEvent(event);
    })

    function changenum(num) {
      labelnum = num.value.replace("D", "");
      let selectValue = selectBox.value;
      var planDiv = document.querySelector('.moreplan');
      var lisInPlan = planDiv.querySelectorAll('ul');
      lisInPlan.forEach(function(ul) {
        ul.classList.add("hidden");
      });

      var selectedUL = document.getElementById(selectValue);
      if (selectedUL) {
        selectedUL.classList.remove("hidden");
      }
      console.log(labelnum)
      plannum = placename[labelnum - 1].length;

    }



    function addMaker() {
      checkbox.checked = false;
      let event = new Event("change");
      checkbox.dispatchEvent(event);
      console.log(labelnum)
        const myLatLng =  hm;
        test1[labelnum - 1].push(hm);
        const mk = new google.maps.Marker({
            position: myLatLng,
            label: `${labelnum}`,
            map,
          });
          markerlist[labelnum - 1].push(mk);
        
          const planList = document.getElementById("D" + labelnum);
          const nameli = document.createElement("li");



          console.log(planList)
          console.log(nameli)
          geocoder.geocode({ location: hm }, function (results, status) {
            if (status === "OK") {
                const place = results[0].place_id;
                fetchData(place);
                console.log(place);

            }
            async function fetchData(res) {
              try{
                qqq = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${res}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`
                const response = await fetch(qqq);
                const data = await response.json();
                placename[labelnum - 1].push(data.result.name);

                console.log(placename);
                nameli.textContent = placename[labelnum - 1][plannum];
                planList.appendChild(nameli);
                plannum = plannum + 1;

                console.log(placesList)
                console.log(nameli)

                
      
              nameli.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                menuBox.style.display="block";
                menuBox.style.top=e.pageY+"px";
                menuBox.style.left=e.pageX+"px";
                count = 0;
      
                for( pq = 0; pq<placename[labelnum - 1].length; pq++){
                  if(placename[labelnum - 1][pq] == nameli.textContent){
                    ct = pq;
                  }
                }         
              })

      


              nameli.addEventListener("click", () => {
                for( pq = 0; pq<placename[labelnum - 1].length; pq++){
                  if(placename[labelnum - 1][pq] == nameli.textContent){
                    ct = pq;
                  }
                }
                map.setCenter(test1[labelnum - 1][ct]);
                information(test1[labelnum - 1][ct]);
                hm = test1[labelnum-1][ct]
                

              });
      
                //nameli.addEventListener("contextmenu", popMenu);
                document.body.addEventListener("click",onBodyClick);
        
      
                function onBodyClick(){
                  hideMenu();
              }
              function hideMenu() {
                  menuBox.style.display="none";
              }


      //marker.getPosition()
                mk.addListener("click", () => {
                  information(mk.getPosition());
      
              })
              }catch (error){
                console.error("Error fetching data:", error);
              }
          
            }
          });
          
    }

    while(count < 1){
      menuItems[0].addEventListener("click", () => {
        restaurantMarker(test1[labelnum - 1][ct]);
      });

      menuItems[1].addEventListener("click", () => {
        parkMarker(test1[labelnum - 1][ct]);
      });

      menuItems[2].addEventListener("click", () => {
        resetMarker(test1[labelnum - 1][ct]);
        resetMarker(test1[labelnum - 1][ct]);
      });
      menuItems[3].addEventListener("click", () => {
        deleteMarker(ct);
      })
      count = count + 1;
    }

    let photoBox = [];
    let currentImageIndex = 0;
    let displayedImage = document.getElementById("0");
    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");


    prevBtn.addEventListener("click", prevImage);
    nextBtn.addEventListener("click", nextImage);

    function prevImage() {
      currentImageIndex = (currentImageIndex - 1 + photoBox.length) % photoBox.length;
      showImage(currentImageIndex);
    }
    
    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % photoBox.length;
      showImage(currentImageIndex);
    }
      function showImage(index) {
        displayedImage.src = photoBox[index];
      }

    function information(rq){
      geocoder.geocode({ location: rq }, function (results, status) {
        if (status === "OK") {
            const place0 = results[0].place_id;
            console.log(place0);
            imf0 = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${place0}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`
            fetch(imf0).then((response) => response.json())
              .then((data) => {
                prevBtn.style.display = 'inline-block'
                nextBtn.style.display = 'inline-block'
                dsee.style.display = 'block'
                if(data.result.photos == undefined){
                  i0.src = "";
                }
                else{
                  for(photonum = 0; photonum < data.result.photos.length; photonum++){
                    photoBox.push(`https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[photonum].photo_reference}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`)
                  }
                  i0.src = `https:maps.googleapis.com/maps/api/place/photo?maxwidth=200&maxheight=100&photo_reference=${data.result.photos[0].photo_reference}&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4`;
                }
                i1.innerHTML = data.result.name;
                if(data.result.rating == undefined){
                  i2.innerHTML = "별점: X"
                }
                else
                  i2.innerHTML = `별점: ${data.result.rating}`;
                if(data.result.reviews == undefined){
                  i3.innerHTML = "";
                  i4.innerHTML = "";
                  i5.innerHTML = "";
                  i6.innerHTML = "";
                  i7.innerHTML = "";
                  i8.innerHTML = "";
                  i3.style.display = 'none'
                  i4.style.display = 'none'
                  i5.style.display = 'none'
                  i6.style.display = 'none'
                  i7.style.display = 'none'
                  i8.style.display = 'none'
                }
                else{
                  i3.style.display = 'block'
                  i4.style.display = 'block'
                  i5.style.display = 'block'
                  i6.style.display = 'block'
                  i7.style.display = 'block'
                  i8.style.display = 'block'
                  i3.innerHTML = `작성자: ${data.result.reviews[0].author_name}`;
                  i4.innerHTML = ` ${data.result.reviews[0].text}`;
                  i5.innerHTML = `작성자: ${data.result.reviews[1].author_name}`;
                  i6.innerHTML = ` ${data.result.reviews[1].text}`;
                  i7.innerHTML = `작성자: ${data.result.reviews[2].author_name}`;
                  i8.innerHTML = ` ${data.result.reviews[2].text}`;
                }
              })
        }})
    }

    
    function deleteMarker(ct) {
      checkbox.checked = false;
      let event = new Event("change");
      checkbox.dispatchEvent(event);
      plannum = plannum - 1;
      console.log(plannum);
        markerlist[labelnum - 1][ct].setMap(null);
        markerlist[labelnum - 1].splice(ct,1);
        test1[labelnum - 1].splice(ct,1);
        placename[labelnum - 1].splice(ct,1);
        console.log(placename)
    
        const planList = document.getElementById("D" + labelnum);
        const listItems = planList.getElementsByTagName("li");
        if(planList.childElementCount == 1){
          while (planList.firstChild) {
            planList.removeChild(listItems[0]);
          }
          plannum = 0;
        }
        else{
          planList.removeChild(listItems[ct]);

        }
        i0.src = "";
        i1.innerHTML = "";
        i2.innerHTML = "";
        i3.innerHTML = "";
        i4.innerHTML = "";
        i5.innerHTML = "";
        i6.innerHTML = "";
        i7.innerHTML = "";
        i8.innerHTML = "";
        prevBtn.style.display = 'none'
        nextBtn.style.display = 'none'
        dsee.style.display = 'none'

    }

    const planbutton = document.getElementById("addplan");
    planbutton.addEventListener("click", addplan);
    let dayCounter = 2;

    function addplan() {
      const selectBox = document.getElementById("selectBox");
      const sidebar = document.getElementsByClassName("moreplan")[0];
 
    
      // 새로운 날짜를 생성하고 추가
      const option = document.createElement("option");
      option.text = "day" + dayCounter;
      option.value = "D" + dayCounter;
      
      selectBox.appendChild(option);
      const ul = document.createElement("ul");
      ul.setAttribute("id", "D" + dayCounter);
      ul.setAttribute("value", dayCounter);
      ul.classList.add("hidden");
      sidebar.appendChild(ul);


      
      dayCounter++; // 다음 날짜를 위해 카운터를 증가
      test1.push([]);
      markerlist.push([]);
      placename.push([]);
    }


    const service = new google.maps.places.PlacesService(map);


    function parkMarker(pi) {
      sb.value = "default";
      change();
      changeim(a_marker);
      const pivot = pi;
      service.nearbySearch(
        { location: pivot, radius: 700, type: "park" },
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
    
          addPlaces(results, map, a_marker);
        },
      );

    }

    function resetMarker(pi){
      sb.value = "default";
      reverse();
      const pivot = pi;
      i0.src = "";
      i1.innerHTML = "";
      i2.innerHTML = "";
      i3.innerHTML = "";
      i4.innerHTML = "";
      i5.innerHTML = "";
      i6.innerHTML = "";
      i7.innerHTML = "";
      i8.innerHTML = "";
      service.nearbySearch(
        { location: pivot, radius: 1, type: "hospital" },
        (results, status, pagination) => {
          
    
          addPlaces(results, map, a_marker);
          changeim(a_marker);
        },
      );

      
    }
    
    function restaurantMarker(pi) {
      sb.value = "default";
      change();
      changeim(a_marker);
      const pivot = pi;
      service.nearbySearch(
        { location: pivot, radius: 700, type: "restaurant" },
        (results, status, pagination) => {
          if (status !== "OK" || !results) return;
    
          addPlaces(results, map, a_marker);
        },
      );
      
    }

    let dayNightButton = document.querySelector(".dayNightButton");
    let rbutton = document.querySelector(".resetbutton");
    function change() {
      if (dayNightButton.value === "night") {
          dayNightButton.value = "day";
      } else {
          dayNightButton.value = "night";
      }
  }
  function reverse() {
    if(rbutton.value === "true"){
      rbutton.value = 'false';
    }
    else{rbutton.value = "true"};
  }

  rnum = 0;
    function addPlaces(places, map, a_marker) {

      console.log(a_marker);
        for (const place of places) {
          if (place.geometry && place.geometry.location) {
            const image = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25),
            };
      
            const anymarker = new google.maps.Marker({
              map,
              icon: image,
              title: place.name,
              position: place.geometry.location,
            });
            a_marker.push(anymarker);
            const li = document.createElement("li");
      
            li.textContent = place.name;
            placesList.appendChild(li);
            anymarker.addListener("click", () => {
              information(anymarker.getPosition());
            })
            li.addEventListener("click", () => {
              map.setCenter(place.geometry.location);
              information(place.geometry.location);
              hm = place.geometry.location;
              mk = anymarker;
    
            });
          }
        }
        rnum = a_marker.length;
        if(rbutton.value === false){
          for( iz = 0; iz < rnum; iz++ ){
            a_marker[0].setMap(null);
            a_marker.splice(0,1);
          }
        }

        sb.addEventListener("change", function() {
          while(placesList.firstChild){
            placesList.removeChild(placesList.firstChild);
          }
          changesort(sb)
      
        })
      
        function changesort(ch){
          if(ch.value == "num"){
            places.sort((a,b) => -a.rating + b.rating);
            for (const place of places) {
              if (place.geometry && place.geometry.location) {
                const li = document.createElement("li");
                li.textContent = place.name;
                placesList.appendChild(li);
                li.addEventListener("click", () => {
                  map.setCenter(place.geometry.location);
                  information(place.geometry.location);
                  
                });
              }
            }
          }
          else if(ch.value == "many"){
            places.sort((a,b) => -a.user_ratings_total + b.user_ratings_total);
            for (const place of places) {
              if (place.geometry && place.geometry.location) {
                const li = document.createElement("li");
                li.textContent = place.name;
                placesList.appendChild(li);
                li.addEventListener("click", () => {
                  map.setCenter(place.geometry.location);
                  information(place.geometry.location);
                              
                });
              }
            }
          }
          else{
            for (const place of places) {
              if (place.geometry && place.geometry.location) {
                const li = document.createElement("li");
                li.textContent = place.name;
                placesList.appendChild(li);
                li.addEventListener("click", () => {
                  map.setCenter(place.geometry.location);
                  information(place.geometry.location);
                              
                });
              }
            }
          }
        }
    }

    function changeim(a_marker) {
      let num = a_marker.length;
      change();
      if(dayNightButton.value ==="night"){
        for( ix = 0; ix < num; ix++){
          a_marker[0].setMap(null);
          a_marker.splice(0,1);
        }
    }
        while(placesList.firstChild){
          placesList.removeChild(placesList.firstChild);
        }
    }



    const displayDirection = function () {
      checkOnlyOne(this);
      calculateAndDisplayRoute(directionsService, directionsRenderer);

    };


    
    checkbox.addEventListener("change", displayDirection);
    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      last = test1[labelnum-1].length;
      const wayps = []
      for(z=1; z<last-1; z++){
        wayps.push({location: test1[labelnum - 1][z]})
      }
      if (checkbox.checked) {        
        console.log(test1[labelnum - 1])
        directionsService
        .route({
          origin: {
            location: test1[labelnum - 1][0],
          },
          destination: {
            location: test1[labelnum - 1][last-1],
          },
          waypoints: wayps,
          travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
      } else {
        directionsRenderer.setDirections({routes: []});
      }
    }

    const walkDirection = function () {
      checkOnlyOne(this);
      calculateAndDisplayRoute1(directionsService, directionsRenderer);

    };

    walkD.addEventListener("change", walkDirection);
    function calculateAndDisplayRoute1(directionsService, directionsRenderer) {
      last = test1[labelnum-1].length;
      const wayps = []
      for(z=1; z<last-1; z++){
        wayps.push({location: test1[labelnum - 1][z]})
      }
      if (walkD.checked) {        
        console.log(test1[labelnum - 1])
        directionsService
        .route({
          origin: {
            location: test1[labelnum - 1][0],
          },
          destination: {
            location: test1[labelnum - 1][last-1],
          },
          waypoints: wayps,
          travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
          directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
      } else {
        directionsRenderer.setDirections({routes: []});
      }
    }
    function checkOnlyOne(checkbox) {
      var checkboxes = document.getElementsByName('option');
      checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
      });
    }

  }
  


window.initMap = initMap;
//https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJa1ImVlaMcTURJaJzqe26hX4&fields=name%2Crating%2Cformatted_address%2Creviews&language=ko&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4 이름 얻기
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJa1ImVlaMcTURJaJzqe26hX4&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4    장소 정보
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AcJnMuEQUX0fF6d4oBuIeyW82l8pt7W5gypjSGxnWw2HhZZg5NqWCotxTnviMnlndCUJAlxz0ZJpf7nhC0O81mFGllb9ggzk6-2GWbZa69w0WeRXmshoUBghTZIcBBpPbTKlmmGTTcG8oPgmABJ31S1TGnDW4zYJruNpmN6qUT6NOb1cuj5R&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4  장소 사진
//https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=34.687403256759424%2C135.52584463969487&radius=1500&type=restaurant&key=AIzaSyAXaYwwO82iGqPtEN2-PJi5tKFMwN5VFG4 오사카 성 주변 음식
