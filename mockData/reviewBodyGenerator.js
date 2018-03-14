const getRandomIndex = array => (
  Math.floor(Math.random() * array.length)
);

const reviewBodyGenerator = (foodType, restaurantName, reviewStars) => {
  const dishesByFoodType = {
    Pizza: ['Pepperoni Supreme', 'Margherita', 'pizza sauce', 'cheese blend', 'garlic sauce',
      'Hawaiian Deluxe', 'selection of toppings', 'garlic bread', 'hot wing platter', 'salad bar'],
    American: ['double bacon cheeseburger', 'fish n chips', 'homemade black bean chili', 'rare ahi salad',
      'garlic aioli', 'selection of beers on tap', 'new york sirloin', 'basket of curly fries', 'onion ring tower',
      'bone marrow appetizer'],
    Chinese: ['general chicken', 'beef chow mein', 'spicy mustard', 'chicken fried rice', 'twice cooked pork',
      'pot sticker appetizer', 'spring roll platter', 'kung pao pork', 'wonton soup', 'fortune cookie'],
    Italian: ['fettucine alfredo', 'bruschetta', 'prociutto and melon', 'pesto ravioli', 'spaghetti and meatballs',
      'eggplant lasagne', 'gnocchi in white sauce', 'frutti di mare dish', 'osso buco', 'house wine'],
    Mexican: ['homemade guacamole', 'chile rellenos dish', 'taco platter', 'pulled pork quesadilla', 'fajita plate',
      'house salsa', 'enchiladas combo', 'burrito supreme', 'mole alla mama', 'beef tostada'],
    Indian: ['chicken tikka masala', 'garlic naan', 'samosa platter', 'tandoori chicken', 'palak paneer', 'biryani',
      'malai kofta dish', 'beef vindaloo', 'mango lassi', 'masoor dal'],
    French: ['French onion soup', 'escargot', 'coq au vin', 'pan-seared foie gras', 'potée lorraine', 'cheese soufflé',
      'steak tartare', 'cassoulet', 'duck confit', 'créme brulée'],
    Brunch: ['crab benedict', 'eggs bendict', 'southwestern omelette', 'cappucino', 'fresh-squeezed orange juice',
      'french toast platter', 'buttermilk pancake stack', 'jam selection', 'crispy hash browns', 'chicken and waffles'],
  };

  const serverNames = ['Tina', 'Anthony', 'Alex', 'Tiffany', 'Stephanie', 'Lauren', 'Tony', 'Jake', 'Timothy', 'Anna', 'Wayne'];

  const dishes = dishesByFoodType[foodType];
  const dishOne = dishes[getRandomIndex(dishes)];
  const dishTwo = dishes[getRandomIndex(dishes)];
  const serverName = serverNames[getRandomIndex(serverNames)];

  const reviews = {
    positive: [
      `Easily the best meal I've had in a while! I highly recommend the ${dishOne} -- so delicious. Definitely do not miss this place.`,
      `HOLY MOLY! The ${dishOne}! The ${dishTwo}! Everything looked and tasted amazing! And their service ... WOW! ${serverName} was the absolute best!  Honestly, I wish I could give this place ten stars -- they deserve it!`,
      `My mom and I both loved this place! I took her there to celebrate her birthday and ${serverName} really went above and beyond to make my mom feel special.`,
      `My partner and I always go here! It's hands-down the best place to go for ${foodType} cuisine in the whole city.`,
      `OMG I srsly wish I could eat ${dishOne} every day it is sooooooooooo good!`,
      `The minute you walk in the door at ${restaurantName}, you are hit with the amazing smells coming out of the kitchen. I promise, if you weren't hungry before, you WILL be then. Take my word for it and try the ${dishOne}. It's simply divine.`,
      `The host, ${serverName} went across the street to get my daughter some crayons! Can you believe that? Anyone who treats my family that way will always get my business.`,
      `I consider myself a foodie and like to think I would have made an excellent restaurant critic if I'd never gone to Hack Reactor. That said, I can think of nothing negative to say about this place. Their ${dishOne} was superb. Everything exceeded my very high expectations. 5 stars.`,
      `I can't believe I'd never heard of this place until this past week. Either way, I know about it now and it can be my new favorite place for ${foodType} cuisine.`,
      'This place is an absolute gem! I love coming here because the atmosphere of the place is relaxing and the coffee is great! The staff are INCREDIBLY kind. Always a wonderful experience!',
    ],
    okay: [
      `Based on the reviews, I had high expectations for ${restaurantName}.  While my experience was underwhelming, there are several commendable aspects to this place.`,
      `The food was okay, but the service was great. I've definitely had a better ${dishOne} than they serve here.`,
      'Overall take: I thought this place was just okay. Granted, going out to eat in general is expensive, but I felt like the prices were a bit high for the quality of food delivered.',
      `Nothing's really wrong at ${restaurantName}, but I'm not itching to go back anytime soon.`,
      'Overall, good food, but I am a stickler for service and it greatly lacked this time around. Aside from the first staff member we encountered, our waiter did not check up on us until we had already paid the bill in which another staff member helped us with. I guess it was just too busy. On another note, nice location and atmosphere, but again, service lacks and parking can be difficult.',
      'In fairness, had the food not been overpriced and the staff not cheat me out of one side I\'d probably give them a better review.',
      `I've eaten here a few times before and every time I leave feeling a little disappointed by the food. I had their ${dishOne} and it was only okay. The ambiance is nice and its at a great location. The service is good, but I think the tables are a little too close to each other. Each time I've been there I have inevitably had to listen to other peoples conversations no matter how much I try to drown them out.`,
      'The food here is hearty and well portioned, but SO SALTY.',
      `The food was good.  I would recommend the ${dishOne} and the ${dishTwo}.  Why not 5 stars? Because they don't have a cocktails, only wine and beer.  I would have loved an old fashioned or whiskey sour with my meal.`,
      'Ultimately, the food here is pretty heavy and the portions are quite large. Though the price is steeper, I think you get what you pay for when it comes to amount. The staff are nice and it\'s a pretty decent celebratory locale.',
    ],
    negative: [
      'UGH!!! The food is SO HEAVY and tastes like grease. BLECH!',
      `I wish I could give this place zero stars. They don't even deserve one. The ${dishOne} was the worst I've ever had.`,
      'There was a mix-up and the server put in the wrong order for me. When I alerted her, she refused to believe me. SO RUDE!',
      `Costs an extra $3.00 to "substitute" with a side salad. Brings my order of ${dishOne} up to $17-$18. But hey, at least my side salad came with a gooey dead fly. Fantastic.`,
      'Today was my fourth time here. After my experience today, there won\'t be a fifth.',
      `Yesterday I ate at ${restaurantName} with a friend, and I found a metal washer in my ${dishOne}! I was shocked and grossed out, because who wants to find metal in their food?`,
      `Bland, inauthentic ${foodType} knock-off food. Really gross.`,
      `I seldom write reviews -- I think it's been years -- but I was so disappointed by my meal last night, and felt so led astray by the FoodiGo-ers, that I felt like I'd make an exception. This is the 3rd time I've been to ${restaurantName}, so I've done my due diligence. The food is just not very good. Twice I had the ${dishOne}, wanting it to be delicious, twice it was flavorless.`,
      'If you\'re looking for a place to take amazing pictures of your food for IG then this is your spot. If you\'re searching for flavor tho... On top of all that the service was poor.',
      'Worst service ever. Never coming back again. I can\'t believe I thought it\'d be a good idea to come all the way from downtown to get here.',
    ],
  };

  let reviewRating;

  if (reviewStars === 5) {
    reviewRating = 'positive';
  } else if (reviewStars === 1) {
    reviewRating = 'negative';
  } else if (reviewStars > 1 && reviewStars < 5) {
    reviewRating = 'okay';
  }

  const possibleReviews = reviews[reviewRating];
  return possibleReviews[getRandomIndex(possibleReviews)];
};


module.exports = reviewBodyGenerator;
