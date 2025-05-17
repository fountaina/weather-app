import ThunderstormSlighHailIcon from "/images/thunderstorm-slight-hail.png"
import ThunderstormHeavyHailIcon from "/images/thunderstorm-heavy-hail.png"
import ThunderstormIcon from "/images/thunderstorm.png"
import HeavySnowIcon from "/images/heavy-snow.png"
import StormyRainIcon from "/images/stormy-rain.png"
import GrainySnow from "/images/grainy-snow.png"
import BlowingSnow from "/images/blowing-snow.png"
import ModerateSnow from "/images/moderate-snow.png"
import Snowflake from "/images/snowflake.png";
import FreezingRain from "/images/freezing-rain.png";
import HeavyRain from "/images/heavy-rain.png";
import ModerateRain from "/images/moderate-rain.png";
import SunRain from "/images/sun-rain.png";
import Icedropplets from "/images/ice-droplets.png";
import SnowRain from "/images/snow-rain.png";
import drizzleIcon from "/images/drizzle.png";
import RimeFogIcon from "/images/rime-fog.png";
import FogIcon from "/images/fog.png";
import CloudsIcon from "/images/clouds.png";
import PartlyCloudyIcon from "/images/partly-cloudy.png";
import SunIcon from "/images/sun.png";

const weatherCodes = [
	{
		code: 0,
		type: "Clear",
		description: "A bright, sunny day with clear blue skies — perfect for outdoor activities or a relaxed stroll.",
		icon: SunIcon,
		severity: 0
	},
	{
		code: 1,
		type: "Partly Cloudy",
		description: "Mostly sunny with a few scattered clouds drifting by — mild and comfortable weather.",
		icon: PartlyCloudyIcon,
		severity: 0
	},
	{
		code: 2,
		type: "Partly Cloudy",
		description: "A mix of sun and clouds with occasional patches of shade — great weather with a slight breeze.",
		icon: PartlyCloudyIcon,
		severity: 0
	},
	{
		code: 3,
		type: "Overcast",
		description: "The sky is completely blanketed by clouds, creating a dull, grey ambiance all day.",
		icon: CloudsIcon,
		severity: 0
	},
	{
		code: 45,
		type: "Fog",
		description: "Thick fog reducing visibility to less than a kilometer — drive cautiously and expect a chilly start.",
		icon: FogIcon,
		severity: 1
	},
	{
		code: 48,
		type: "Fog",
		description: "Dense fog accompanied by frost, clinging to surfaces — icy conditions may affect travel.",
		icon: RimeFogIcon,
		severity: 1
	},
	{
		code: 51,
		type: "Drizzle",
		description: "A light, misty drizzle that slightly dampens the ground — carry a light jacket just in case.",
		icon: drizzleIcon,
		severity: 1
	},
	{
		code: 53,
		type: "Drizzle",
		description: "A steady, moderate drizzle — expect a constant light wetness throughout the day.",
		icon: drizzleIcon,
		severity: 2
	},
	{
		code: 55,
		type: "Drizzle",
		description: "A persistent, heavy drizzle — umbrellas or raincoats strongly recommended.",
		icon: drizzleIcon,
		severity: 2
	},
	{
		code: 56,
		type: "Drizzle",
		description: "A light freezing drizzle — roads and surfaces may become slippery with a thin layer of ice.",
		icon: SnowRain,
		severity: 2
	},
	{
		code: 57,
		type: "Drizzle",
		description: "Intense freezing drizzle causing rapid ice buildup — exercise caution while walking or driving.",
		icon: Icedropplets,
		severity: 2
	},
	{
		code: 61,
		type: "Rain",
		description: "Scattered light rain showers — short-lived but could return later. Keep your umbrella handy.",
		icon: SunRain,
		severity: 1
	},
	{
		code: 63,
		type: "Rain",
		description: "Steady moderate rainfall — expect consistent wet conditions and cooler temperatures.",
		icon: ModerateRain,
		severity: 2
	},
	{
		code: 65,
		type: "Rain",
		description: "Heavy rainfall throughout the day — potential for flooding in low-lying areas.",
		icon: HeavyRain,
		severity: 3
	},
	{
		code: 66,
		type: "Freezing Rain",
		description: "Light rain freezing on contact — ice may form on roads, trees, and power lines.",
		icon: FreezingRain,
		severity: 3
	},
	{
		code: 67,
		type: "Freezing Rain",
		description: "Severe freezing rain event — widespread ice buildup likely to disrupt transport and power.",
		icon: FreezingRain,
		severity: 4
	},
	{
		code: 71,
		type: "Snow",
		description: "Gentle snowflakes falling lightly — may accumulate on grassy surfaces but little disruption expected.",
		icon: Snowflake,
		severity: 1
	},
	{
		code: 73,
		type: "Snow",
		description: "Moderate snowfall blanketing the ground — ideal for winter scenery but may affect driving.",
		icon: ModerateSnow,
		severity: 2
	},
	{
		code: 75,
		type: "Snow",
		description: "Heavy snowfall creating whiteout conditions — expect travel delays and road closures.",
		icon: BlowingSnow,
		severity: 3
	},
	{
		code: 77,
		type: "Snow Grains",
		description: "Tiny, hard snow grains — unlike flakes, they bounce on impact and may reduce traction.",
		icon: GrainySnow,
		severity: 1
	},
	{
		code: 80,
		type: "Rain Shower",
		description: "Brief, light rain showers — can appear suddenly but typically pass just as fast.",
		icon: SunRain,
		severity: 1
	},
	{
		code: 81,
		type: "Rain Shower",
		description: "Intermittent moderate rain showers — occasional bursts of wet weather expected.",
		icon: ModerateRain,
		severity: 2
	},
	{
		code: 82,
		type: "Rain Shower",
		description: "Violent rain showers with possible thunder — seek shelter during downbursts.",
		icon: StormyRainIcon,
		severity: 3
	},
	{
		code: 85,
		type: "Snow Shower",
		description: "Light snow showers drifting in and out — short-lived but can briefly whiten surfaces.",
		icon: ModerateSnow,
		severity: 1
	},
	{
		code: 86,
		type: "Snow Shower",
		description: "Frequent, heavy snow showers — visibility may drop quickly, and roads may become slick.",
		icon: HeavySnowIcon,
		severity: 3
	},
	{
		code: 95,
		type: "Thunderstorm",
		description: "A moderate thunderstorm with occasional lightning and rumbles — stay indoors when possible.",
		icon: ThunderstormIcon,
		severity: 3
	},
	{
		code: 96,
		type: "Thunderstorm",
		description: "Thunderstorm with small hailstones — may cause damage to plants and roofs.",
		icon: ThunderstormSlighHailIcon,
		severity: 4
	},
	{
		code: 99,
		type: "Thunderstorm",
		description: "Severe thunderstorm with intense hail and strong winds — take shelter and avoid travel.",
		icon: ThunderstormHeavyHailIcon,
		severity: 5
	}
];

export default weatherCodes;
