import { DEFAULT_GALLERY, DEFAULT_HERO_MEDIA, DEFAULT_NEWS, DEFAULT_EVENTS, DEFAULT_ACHIEVERS, DEFAULT_VISION_MISSION, DEFAULT_FEES, DEFAULT_ALUMNI_TESTIMONIALS } from './defaultData'
import { getImageUrl } from './cloudinary'
import { database, ref, set, get, child } from './firebase'

// Helper to fetch from Firebase
const fetchFromDB = async (path, defaultData) => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return defaultData;
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
    return defaultData;
  }
};

// Helper to save to Firebase
const saveToDB = async (path, data) => {
  try {
    await set(ref(database, path), data);
    return true;
  } catch (error) {
    console.error(`Error saving ${path}:`, error);
    return false;
  }
};

export const getNews = async () => await fetchFromDB('meridian_news_v2', DEFAULT_NEWS);
export const saveNews = async (newsArray) => await saveToDB('meridian_news_v2', newsArray);

export const getEvents = async () => await fetchFromDB('meridian_events_v2', DEFAULT_EVENTS);
export const saveEvents = async (eventsArray) => await saveToDB('meridian_events_v2', eventsArray);

export const getHeroMedia = async () => await fetchFromDB('meridian_hero_v2', DEFAULT_HERO_MEDIA);
export const saveHeroMedia = async (mediaArray) => await saveToDB('meridian_hero_v2', mediaArray);

export const getGallery = async () => await fetchFromDB('meridian_gallery_v3', DEFAULT_GALLERY);
export const saveGallery = async (galleryArray) => await saveToDB('meridian_gallery_v3', galleryArray);

export const getHomepageGallery = async () => {
  const data = await fetchFromDB('meridian_homepage_gallery_v2', null);
  return data ? data : DEFAULT_GALLERY.slice(0, 9);
};
export const saveHomepageGallery = async (galleryArray) => await saveToDB('meridian_homepage_gallery_v2', galleryArray);

const DEFAULT_ABOUT_IMAGE = getImageUrl('meridian/photo_008', { width: 800 });
export const getAboutImage = async () => await fetchFromDB('meridian_about_image_v1', DEFAULT_ABOUT_IMAGE);
export const saveAboutImage = async (url) => await saveToDB('meridian_about_image_v1', url);

const DEFAULT_GALLERY_SETTINGS = {
  label: 'Campus Life',
  heading: 'Campus Gallery',
  tagline: 'Real moments from Meridian College — our students, faculty, labs, and events',
};
export const getGallerySettings = async () => await fetchFromDB('meridian_gallery_settings_v1', DEFAULT_GALLERY_SETTINGS);
export const saveGallerySettings = async (settings) => await saveToDB('meridian_gallery_settings_v1', settings);

export const getAchievers = async () => await fetchFromDB('meridian_achievers_v2', DEFAULT_ACHIEVERS);
export const saveAchievers = async (achieversArray) => await saveToDB('meridian_achievers_v2', achieversArray);

const DEFAULT_ACHIEVERS_SETTINGS = {
  label: 'Student Success',
  heading: 'Our Achievers',
  tagline: 'Celebrating the outstanding accomplishments of Meridian students.',
};
export const getAchieversSettings = async () => await fetchFromDB('meridian_achievers_settings_v1', DEFAULT_ACHIEVERS_SETTINGS);
export const saveAchieversSettings = async (settings) => await saveToDB('meridian_achievers_settings_v1', settings);

export const getVisionMission = async () => await fetchFromDB('meridian_vision_mission_v1', DEFAULT_VISION_MISSION);
export const saveVisionMission = async (data) => await saveToDB('meridian_vision_mission_v1', data);

export const getFees = async () => await fetchFromDB('meridian_fees_v1', DEFAULT_FEES);
export const saveFees = async (data) => await saveToDB('meridian_fees_v1', data);

export const getAlumniTestimonials = async () => await fetchFromDB('meridian_alumni_testimonials_v1', DEFAULT_ALUMNI_TESTIMONIALS);
export const saveAlumniTestimonials = async (testimonialsArray) => await saveToDB('meridian_alumni_testimonials_v1', testimonialsArray);

const DEFAULT_SECRETARY_IMAGE = getImageUrl('meridian/chairman', { width: 600 });
export const getSecretaryImage = async () => await fetchFromDB('meridian_secretary_image_v1', DEFAULT_SECRETARY_IMAGE);
export const saveSecretaryImage = async (url) => await saveToDB('meridian_secretary_image_v1', url);

const DEFAULT_PRINCIPAL_IMAGE = getImageUrl('meridian/principal', { width: 600 });
export const getPrincipalImage = async () => await fetchFromDB('meridian_principal_image_v1', DEFAULT_PRINCIPAL_IMAGE);
export const savePrincipalImage = async (url) => await saveToDB('meridian_principal_image_v1', url);

