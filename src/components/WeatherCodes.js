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
		description: "Clear sky",
		icon: SunIcon,
		severity: 0
	},
	{
		code: 1,
		type: "Partly Cloudy",
		description: "Mainly clear (0-25% clouds)",
		icon: PartlyCloudyIcon,
		severity: 0
	},
	{
		code: 2,
		type: "Partly Cloudy",
		description: "Partly cloudy (25-50% clouds)",
		icon: PartlyCloudyIcon,
		severity: 0
	},
	{
		code: 3,
		type: "Overcast",
		description: "Fully cloudy (100% clouds)",
		icon: CloudsIcon,
		severity: 0
	},
	{
		code: 45,
		type: "Fog",
		description: "Fog (visibility <1km)",
		icon: FogIcon,
		severity: 1
	},
	{
		code: 48,
		type: "Fog",
		description: "Depositing rime fog",
		icon: RimeFogIcon,
		severity: 1
	},
	// Precipitation (Rain/Drizzle/Snow)
	{
		code: 51,
		type: "Drizzle",
		description: "Light drizzle",
		icon: drizzleIcon,
		severity: 1
	},
	{
		code: 53,
		type: "Drizzle",
		description: "Moderate drizzle",
		icon: drizzleIcon,
		severity: 2
	},
	{
		code: 55,
		type: "Drizzle",
		description: "Dense drizzle",
		icon: drizzleIcon,
		severity: 2
	},
	{
		code: 56,
		type: "Drizzle",
		description: "Light Freezing Drizzle",
		icon: SnowRain,
		severity: 2
	},
	{
		code: 57,
		type: "Drizzle",
		description: "Dense Freezing Drizzle",
		icon: Icedropplets,
		severity: 2
	},
	{
		code: 61,
		type: "Rain",
		description: "Slight rain",
		icon: SunRain,
		severity: 1
	},
	{
		code: 63,
		type: "Rain",
		description: "Moderate rain",
		icon: ModerateRain,
		severity: 2
	},
	{
		code: 65,
		type: "Rain",
		description: "Heavy rain",
		icon: HeavyRain,
		severity: 3
	},
	// Freezing Precipitation
	{
		code: 66,
		type: "Freezing Rain",
		description: "Light freezing rain",
		icon: FreezingRain,
		severity: 3
	},
	{
		code: 67,
		type: "Freezing Rain",
		description: "Heavy freezing rain",
		icon: FreezingRain,
		severity: 4
	},
	// Snow
	{
		code: 71,
		type: "Snow",
		description: "Slight snowfall",
		icon: Snowflake,
		severity: 1
	},
	{
		code: 73,
		type: "Snow",
		description: "Moderate snowfall",
		icon: ModerateSnow,
		severity: 2
	},
	{
		code: 75,
		type: "Snow",
		description: "Heavy snowfall",
		icon: BlowingSnow,
		severity: 3
	},
	{
		code: 77,
		type: "Snow Grains",
		description: "Ice pellets (no flakes)",
		icon: GrainySnow,
		severity: 1
	},
	// Showers
	{
		code: 80,
		type: "Rain Shower",
		description: "Slight rain showers",
		icon: SunRain,
		severity: 1
	},
	{
		code: 81,
		type: "Rain Shower",
		description: "Moderate rain showers",
		icon: ModerateRain,
		severity: 2
	},
	{
		code: 82,
		type: "Rain Shower",
		description: "Violent rain showers",
		icon: StormyRainIcon,
		severity: 3
	},
	{
		code: 85,
		type: "Snow Shower",
		description: "Slight snow showers",
		icon: ModerateSnow,
		severity: 1
	},
	{
		code: 86,
		type: "Snow Shower",
		description: "Heavy snow showers",
		icon: HeavySnowIcon,
		severity: 3
	},
	// Thunderstorms
	{
		code: 95,
		type: "Thunderstorm",
		description: "Moderate thunderstorm",
		icon: ThunderstormIcon,
		severity: 3
	},
	{
		code: 96,
		type: "Thunderstorm",
		description: "Thunderstorm with slight hail",
		icon: ThunderstormSlighHailIcon,
		severity: 4
	},
	{
		code: 99,
		type: "Thunderstorm",
		description: "Thunderstorm with heavy hail",
		icon: ThunderstormHeavyHailIcon,
		severity: 5
	}
]
export default weatherCodes;
