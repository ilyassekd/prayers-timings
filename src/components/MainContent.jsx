// import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayers from './Prayers';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import "moment/dist/locale/ar-ma"
moment.locale("ar-ma")
function MainContent() {



const [nextPrayerIndex, setnextPrayerIndex] = useState(0)



  const [timing, seTiming] = useState({
    Fajr: "04:47",
    Dhuhr: "12:41",
    Asr: "16:11",
    Maghrib: "19:03",
    Isha: "20:17",
  })

  const [remainingTime, setRemainingTime] = useState("");


  const [selectdCity, setselectdCity] = useState({
    displayName: "اليوسفية",
    apiName: "Youssoufia"
  });

  const [today, setToday] = useState("");


  const avilableCities = [
    {
      displayName: "اليوسفية",
      apiName: "Youssoufia"
    },
    {
      displayName: "الدار البيضاء",
      apiName: "Casablanca"
    },
    {
      displayName: "اسفي",
      apiName: "Safi"
    },
  ];

const prayersArray = [
  {key: "Fajr", displayName:"الفجر"},
  { key: "Dhuhr", displayName: "الظهر" },
  { key: "Asr", displayName: "العصر" },
  { key: "Maghrib", displayName: "المغرب" },
  { key: "Isha", displayName: "العشاء" },
]

  // API 
  const getTimings = async () => {
    console.log("hooooo")
    const response = await axios.get(
      `http://api.aladhan.com/v1/timingsByCity/:date?country=MA&city=${selectdCity.apiName}`
    );
    seTiming(response.data.data.timings);

  };


  useEffect(() => {
    getTimings();

  }, [selectdCity]
  )

  useEffect(() => {

    let interval = setInterval(() => {
      console.log("hello");

      setCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format('MMMM Do YYYY | h:mm'))

    return () => {
      clearInterval(interval)
    }

  }, [timing])


  const setCountdownTimer = () => {
    const momentNow = moment();
    
    let prayerIndex = 2;
    if (
			momentNow.isAfter(moment(timing["Fajr"], "hh:mm")) &&
			momentNow.isBefore(moment(timing["Dhuhr"], "hh:mm"))
		) {
			prayerIndex = 1;
		} else if (
			momentNow.isAfter(moment(timing["Dhuhr"], "hh:mm")) &&
			momentNow.isBefore(moment(timing["Asr"], "hh:mm"))
		) {
			prayerIndex = 2;
		} else if (
			momentNow.isAfter(moment(timing["Asr"], "hh:mm")) &&
			momentNow.isBefore(moment(timing["Maghrib"], "hh:mm"))
		) {
			prayerIndex = 3;
		} else if (
			momentNow.isAfter(moment(timing["Maghrib"], "hh:mm")) &&
			momentNow.isBefore(moment(timing["Isha"], "hh:mm"))
		)
    {
			prayerIndex = 4;
		} else {
			// eslint-disable-next-line no-unused-vars
			prayerIndex = 0;
		}
    setnextPrayerIndex(prayerIndex);

    const nextPrayerObject = prayersArray[prayerIndex]
    const nextPrayerTime = timing[nextPrayerObject.key]
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

		let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

		if (remainingTime < 0) {
			const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
			const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
				moment("00:00:00", "hh:mm:ss")
			);

			const totalDiffernce = midnightDiff + fajrToMidnightDiff;

			remainingTime = totalDiffernce;
		}
		console.log(remainingTime);

		const durationRemainingTime = moment.duration(remainingTime);

		setRemainingTime(
			`${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
		);
		console.log(
			"duration issss ",
			durationRemainingTime.hours(),
			durationRemainingTime.minutes(),
			durationRemainingTime.seconds()
		);
  }


  const handleCityChange = (event) => {
    const cityObject = avilableCities.find((city) => {
      return city.apiName === event.target.value;
    })
    console.log("the new value is", event.target.value);
    setselectdCity(cityObject)
  };
  return (
    <>
      {/* TOP ROW */}
      <Grid container className="Grid">
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectdCity.displayName}</h1>

          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2>متبقي على صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      {/* ////TOP ROW /////*/}

      <Divider className='divider' />

      {/* PRAYERS CARDS */}

      <Stack
        className='hello'
        direction="row"
        justifyContent={"space-around"}
        style={{ marginTop: "50px", }}>

        <Prayers
          salat="الفجر"
          time={timing.Fajr}
          image='/fajr-prayer.png'
        />
        <Prayers
          salat="الظهر"
          time={timing.Dhuhr}
          image='/dhhr-prayer-mosque.png'
        />
        <Prayers
          salat="العصر"
          time={timing.Asr}
          image='/asr-prayer-mosque.png'
        />
        <Prayers
          salat="المغرب"
          time={timing.Maghrib}
          image='/sunset-prayer-mosque.png'
        />
        <Prayers
          salat="العشاء"
          time={timing.Isha}
          image='/night-prayer-mosque.png'
        />
      </Stack>
      {/*///// PRAYERS CARDS /////// */}

      {/* SELECT CITY */}

      <Stack direction="row" justifyContent={"center"} style={{ marginTop: "40px" }}>
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span className='madina'>المدينة</span>
          </InputLabel>

          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="age"
            onChange={handleCityChange}
          >

            {avilableCities.map((city) => {
              return (
                <MenuItem
                  value={city.apiName}
                  key={city.apiName}
                >
                  {city.displayName}
                </MenuItem>
              );
            })}

          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
export default MainContent