function addToCart(course) {
  //the global variable is found in the indexjs. We push in the array the course
  //that needs to be added, but before that we need to check if the course is already in
  //the cart.
  const cart = globalVariable.cart;
  const isTheCourseAlreadyInTheCart = cart.some(function(c) {
    return c.id == course.id;
  });
  if (isTheCourseAlreadyInTheCart) {
    //if it is duplicate just end the function execution
    return;
  }
  //or add the course in the array.
  cart.push(course);
  //we set the number on the top right to be the number of courses in the cart array
  $("#cart-items").html(cart.length);
}

$(document).ready(function() {
  //Imagine taking this from the firebase API backend.
  //For demo purpose I will set the array of objects directly in the variable below
  const courses = [
    {
      id: 1,
      title: "Javascript Course",
      description: "You will learn about Javasript",
      price: 99.4,
      image:
        "https://www.tutorialrepublic.com/lib/images/javascript-illustration.png"
    },
    {
      id: 2,
      title: "HTML Course",
      description: "You will learn about HTML5",
      price: 5.4,
      image: "https://i.udemycdn.com/course/750x422/766592_66ac_4.jpg"
    },
    {
      id: 3,
      title: "CSS Course",
      description: "You will learn about CSS",
      price: 11.25,
      image: "https://mdbootstrap.com/wp-content/uploads/2019/01/css.jpg"
    },
    {
      id: 4,
      title: "C# Course",
      description: "You will learn about C#",
      price: 47.82,
      image:
        "https://cdn-images-1.medium.com/max/2600/1*MfOHvI5b1XZKYTXIAKY7PQ.png"
    }
  ];

  courses.forEach(function(course) {
    $("#courses").append(`
        <div class="card col-md-3 m-2">
            <img src="${course.image}" class="card-img-top" />
            <div class="card-body" id="course-${course.id}">
                <h5 class="card-title">${course.title}</h5>
                <p class="card-text">${course.description}</p>
                <!-- The button will go here -->
            </div>
        </div>
    `);

    const button = $("<a href='#' class='btn btn-primary'>Add to cart</a>");
    button.click(function() {
      addToCart(course);
    });
    $(`#course-${course.id}`).append(button);
  });
});
