# Cascade Test

![](https://s3.amazonaws.com/motoportfoliobucket/github/cascadeenergy.jpg)

## Installation

```
git clone https://github.com/titchimoto/cascade-test
npm install
npm test
npm start
```

My solution to the problem provided was to create a Single Page React Application, that makes a certain number of calls to the Dark Sky API, depending on how many days worth of data is required, and then from that data, work out whether the Heating or Air Conditioning came on at least once during that day. This is then displayed on the UI as a number, out of how many possible days in the month.

Note: In order to get this running locally, you will need to provide your own Dark Sky API key. This can be placed in a `.env` file at the root of your project, and referenced as `REACT_APP_DARK_SKY_KEY`. 

## Details

#### `Selector.js`

The majority of the heavy lifting is done inside the `Selector.js` component. This is where the month selection occurs, and then based upon which month is selected, a different number of calls gets made to the Dark Sky API.

As the Dark Sky API only returns 24 hours worth of weather data, I implemented a simple `for` loop to guide how many times the API needed to fetch data (using `async/await` with `fetch`), depending on how many days in a month (January 31, April 30 etc).

After the API has gathered the hourly data for that day, it calls another function which simply iterates over the hourly data it just collected, and sees if the temperature dropped either below 62 or went above 75. If so, it increments a counter by 1 and moves on to the next day.

Just a side note, I would normally use more `ES6` conventions when iterating over data sets, such as `.forEach` and `.map`, but in potential future versions, it would be my intention to able to make use of a `for` loop `break` statement, to potentially break out from the loop early, thus saving unnecessary iterations over the large data set, and improving efficiency.


## Considerations

#### Efficiency

Whilst it is functional, I believe the actual implementation is not as efficient as it potentially could be, possibly due to the CORS workaround bottleneck. I believe with a few more tweaks and some refactoring, this could definitely be improved upon in the future.

In order to combat some of the potential delay in returning results, I added a few extra UI elements such as the `<Loading />` component spinner, which gives the user some eye-candy and some feedback that data is still being retrieved.

#### Design

I aimed to have a pleasant and clean UI design on this one, taking some of the Cascade Energy branding elements and integrating them.

However, the design is certainly cosmetic over functional at this point, with more time, I would love to add some media queries to make this fully responsive, as this seems like the perfect tool to be viewed on smaller resolution devices such as tablets/phones etc.


#### Testing

The current test suite is using a combination of Enzyme and Jest. It is mostly there just for an example, as the test suite is extremely limited.

However, I do have experience with testing React components using tools such as Enzyme and Jest, and also using Mocha and Chai for other JavaScript testing, and would be able to create a full comprehensive test suite for an application such as this.


#### `create-react-app`

As I knew I was building an SPA for this process, and time was of the essence, I used `create-react-app` as a quick way to get a simple React application up and running. I do, however, feel comfortable configuring Webpack and babel from scratch for more custom, bespoke situations.

#### CORS

In the interest of saving time, I used a simple CORS workaround in order to navigate the Dark Sky security settings. In a production application, obviously this would not be the case, and we would have more control over server settings, but for a technical exercise such as this, this would just be a temporary workaround.
