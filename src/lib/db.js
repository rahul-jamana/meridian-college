// Simple LocalStorage Database for Admin Portal
import { DEFAULT_GALLERY, DEFAULT_HERO_MEDIA, DEFAULT_NEWS, DEFAULT_EVENTS, DEFAULT_ACHIEVERS, DEFAULT_VISION_MISSION, DEFAULT_FEES } from './defaultData'
export const getNews = () => {
  const data = localStorage.getItem('meridian_news_v2');
  return data ? JSON.parse(data) : DEFAULT_NEWS;
};

export const saveNews = (newsArray) => {
  localStorage.setItem('meridian_news_v2', JSON.stringify(newsArray));
};

export const getEvents = () => {
  const data = localStorage.getItem('meridian_events_v2');
  return data ? JSON.parse(data) : DEFAULT_EVENTS;
};

export const saveEvents = (eventsArray) => {
  localStorage.setItem('meridian_events_v2', JSON.stringify(eventsArray));
};

export const getHeroMedia = () => {
  const data = localStorage.getItem('meridian_hero_v2');
  return data ? JSON.parse(data) : DEFAULT_HERO_MEDIA;
};

export const saveHeroMedia = (mediaArray) => {
  localStorage.setItem('meridian_hero_v2', JSON.stringify(mediaArray));
};

export const getGallery = () => {
  const data = localStorage.getItem('meridian_gallery_v3');
  return data ? JSON.parse(data) : DEFAULT_GALLERY;
};

export const saveGallery = (galleryArray) => {
  localStorage.setItem('meridian_gallery_v3', JSON.stringify(galleryArray));
};

export const getHomepageGallery = () => {
  const data = localStorage.getItem('meridian_homepage_gallery_v2');
  // By default, just take the first 9 of the DEFAULT_GALLERY so it's not empty
  return data ? JSON.parse(data) : DEFAULT_GALLERY.slice(0, 9);
};

export const saveHomepageGallery = (galleryArray) => {
  localStorage.setItem('meridian_homepage_gallery_v2', JSON.stringify(galleryArray));
};

const DEFAULT_ABOUT_IMAGE = 'https://res.cloudinary.com/dbmpqbgar/image/upload/f_auto,q_auto,w_800,c_fill,g_auto/meridian/photo_008';

export const getAboutImage = () => {
  return localStorage.getItem('meridian_about_image_v1') || DEFAULT_ABOUT_IMAGE;
};

export const saveAboutImage = (url) => {
  localStorage.setItem('meridian_about_image_v1', url);
};

const DEFAULT_GALLERY_SETTINGS = {
  label: 'Campus Life',
  heading: 'Campus Gallery',
  tagline: 'Real moments from Meridian College — our students, faculty, labs, and events',
};

export const getGallerySettings = () => {
  const data = localStorage.getItem('meridian_gallery_settings_v1');
  return data ? JSON.parse(data) : DEFAULT_GALLERY_SETTINGS;
};

export const saveGallerySettings = (settings) => {
  localStorage.setItem('meridian_gallery_settings_v1', JSON.stringify(settings));
};

export const getAchievers = () => {
  const data = localStorage.getItem('meridian_achievers_v2');
  return data ? JSON.parse(data) : DEFAULT_ACHIEVERS;
};

export const saveAchievers = (achieversArray) => {
  localStorage.setItem('meridian_achievers_v2', JSON.stringify(achieversArray));
};

const DEFAULT_ACHIEVERS_SETTINGS = {
  label: 'Student Success',
  heading: 'Our Achievers',
  tagline: 'Celebrating the outstanding accomplishments of Meridian students.',
};

export const getAchieversSettings = () => {
  const data = localStorage.getItem('meridian_achievers_settings_v1');
  return data ? JSON.parse(data) : DEFAULT_ACHIEVERS_SETTINGS;
};

export const saveAchieversSettings = (settings) => {
  localStorage.setItem('meridian_achievers_settings_v1', JSON.stringify(settings));
};

export const getVisionMission = () => {
  const data = localStorage.getItem('meridian_vision_mission_v1');
  return data ? JSON.parse(data) : DEFAULT_VISION_MISSION;
};

export const saveVisionMission = (data) => {
  localStorage.setItem('meridian_vision_mission_v1', JSON.stringify(data));
};

export const getFees = () => {
  const data = localStorage.getItem('meridian_fees_v1');
  return data ? JSON.parse(data) : DEFAULT_FEES;
};

export const saveFees = (data) => {
  localStorage.setItem('meridian_fees_v1', JSON.stringify(data));
};
