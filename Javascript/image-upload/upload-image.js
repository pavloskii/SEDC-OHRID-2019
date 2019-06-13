//Funkcija koja samo ja konvertira slikata vo Base64
//Bez optimizacii ovaa funkcija vadi ogromni stringovi.
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    var imageURL = reader.result;
    console.log(imageURL);
  };
  reader.readAsDataURL(file);
}

//Ovaa funkcija pokraj toa sto ja konvertira slikata vo Base64
//isto taka moze i dokolku skate da i go namalite kvalitetot
//kako i da i napravi resize do posakuvanata sirina.
//Parameters:
// - element - elementot koj go predizvikal eventot(vo slucajov toa onchange eventot vrz fileinput elementot)
// - quality - kvalitetot na slikata, moze da se prati od 0 do 1, kade 0 e najlos kvalitet a 1 e originalniot kvalitet
// - resizeToWidth - sirinata koja sakate da ja ima slikata. Najcesto sakate primer profilnite sliki na webstrana da se so ista sirina
function convertImageToBase64(element, quality, resizeToWidth) {
  if (element.files.length > 0) {
    var file = element.files[0];
    var allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedImageTypes.includes(file.type)) {
      //Ovde validirame dali izbraniot file e slika. Dokolku sakate primer
      //userite da smeaat da uploadiraat samo jpeg sliki, trgnete gi png i gif
      //od nizata
      alert("The file is not an image!");
      return;
    }
    var quality = quality || 0.3; //Ako ne ispratite posakuvam kvalitet, se zema 0.3 kako defaultna vrednost
    var reader = new FileReader();

    reader.onload = function(e) {
      var img = new Image();
      img.src = e.target.result;
      img.onload = function() {
        var canvas = document.createElement("canvas");

        if (resizeToWidth) {
          img.height = img.height / (img.width / resizeToWidth);
          img.width = resizeToWidth;
        }

        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var imageURL = canvas.toDataURL("image/jpeg", quality);
        //Ovde vekje go imate kreiranot URL na slikata i moze
        //da pravite sto sakate so nego. Vo primerov ke go stavime
        //kako src na nekoj image element. Moze da napravite funkcijata
        //da go vrakja imageURL pa da go koristite poinaku.
        document.getElementById("selected-image").src = imageURL;
      };
    };
    reader.readAsDataURL(file);
  }
}
