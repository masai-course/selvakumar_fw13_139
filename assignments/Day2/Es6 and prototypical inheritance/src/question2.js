// Problem 7

const foodDeliveryService = {
    serviceName: "TastyBites Delivery",
    location: "Foodville",
    restaurants: {
      italianCorner: {
        menu: {
          pizza: { available: 20, price: 12 },
          pasta: { available: 30, price: 10 },
          salad: { available: 15, price: 8 },
        },
        orders: [
          { id: 1, items: ["pizza", "pasta"], total: 22 },
          { id: 2, items: ["salad", "pasta"], total: 18 },
          { id: 3, items: ["pizza"], total: 12 },
        ],
      },
      burgerJoint: {
        menu: {
          burger: { available: 25, price: 8 },
          fries: { available: 40, price: 4 },
          drink: { available: 30, price: 2 },
        },
        orders: [
          { id: 1, items: ["burger", "fries"], total: 12 },
          { id: 2, items: ["drink", "burger", "fries"], total: 14 },
          { id: 3, items: ["drink"], total: 2 },
        ],
      },
    },
    restaurantNames: ["italianCorner", "burgerJoint"],
  };
  
  // Level-Problem 7-1
  function findDetails(foodDeliveryService) {
    const {
      restaurants: {
        italianCorner: {
          menu: { pizza: { available: pizzaAvailable, price: pizzaPrice } },
        },
        burgerJoint: {
          menu: { burger: { available: burgerAvailable, price: burgerPrice } },
        },
      },
    } = foodDeliveryService;
  
    return {
      pizzaAvailable,
      burgerAvailable,
      pizzaPrice,
      burgerPrice,
    };
  }
  // console.log(findDetails(foodDeliveryService).pizzaAvailable); // 20
  // console.log(findDetails(foodDeliveryService).burgerAvailable); // 25
  // console.log(findDetails(foodDeliveryService).pizzaPrice); // 12
  // console.log(findDetails(foodDeliveryService).burgerPrice); // 8
  
  // Level-Problem 7-2
  function calculateTotalRevenue(foodDeliveryService) {
    let totalRevenue = 0;
    for (const restaurantName of foodDeliveryService.restaurantNames) {
      const restaurant = foodDeliveryService.restaurants[restaurantName];
      for (const order of restaurant.orders) {
        totalRevenue += order.total;
      }
    }
    return `Total Revenue: ${totalRevenue}`;
  }
  //  console.log(calculateTotalRevenue(foodDeliveryService)); //80 = (22+18+12+12+14+2)
   
  // Problem 8
  
  function studentData(firstName, lastName, age, marksArray, ...rest) {
  const averageMark = marksArray.reduce((total, mark) => total + mark, 0) / marksArray.length;
  const fullName = `${firstName} ${lastName}`;
  const getInfo = function() {
    return `${fullName}'s age is ${age}.`;
  };
  const getResult = function() {
    return averageMark < 50 ? 'Result: FAIL' : 'Result: PASS';
  };
  const hobbies = rest;
  return {
    fullName,
    age,
    hobbies,
    getInfo,
    getResult
  };
  }
  
// Example invocation
let obj1 = studentData(
  "john",
  "stark",
  38,
  [50, 60, 70],
  "Singing",
  "Coding",
  "Meditating"
);
// console.log(JSON.stringify(obj1));// {"fullName":"john stark","age":38,"hobbies":["Singing","Coding","Meditating"]}
// console.log(obj1.getInfo()); //john stark's age is 38.
// console.log(obj1.getResult()) // Result: PASS
  
  //don't remove below export statement part
  export {
      studentData,
      calculateTotalRevenue,
      findDetails
  };
  