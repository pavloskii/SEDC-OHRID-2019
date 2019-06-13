$(document).ready(function() {
  const cart = globalVariable.cart;
  //if there is no courses in cart just return and finish
  if (cart.length == 0) {
    return;
  }
  //else we find the total sum to pay.
  let sumToPay = 0;
  //we add a list item to container
  $("#courses-in-cart").html(
    `<ul class="list-unstyled" id="cart-pay-list"></ul>`
  );
  //for each course we add a list item with the information and the price of the course
  cart.forEach(function(course) {
    sumToPay += course.price;

    $("#cart-pay-list").append(`  
        <li class="media">
            <img src="${course.image}" class="mr-3 cart-image">
            <div class="media-body">
                <h5 class="mt-0 mb-1">${course.title}</h5>
                ${course.description}
            </div>
            <div>${course.price}$</div>
        </li>`);
  });
  //at the end we add a horizontal line and put the total sum to pay
  $("#courses-in-cart").append(
    `<hr/>
     <div class="text-right">
        <h3 >${sumToPay.toFixed(2)}$</h3>
        <button class="btn btn-success mb-2">Pay</button>
     </div>
     `
  );
});
