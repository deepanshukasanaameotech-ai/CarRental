// Utility functions for image handling
import { BASE_URL } from "../api";

/**
 * Builds a complete image URL from a raw URL string
 * @param {string} rawUrl - The raw URL from the backend
 * @returns {string|null} - Complete URL or null if no URL provided
 */
export const buildImageUrl = (rawUrl) => {
  if (!rawUrl) return null;
  if (rawUrl.startsWith("http")) return rawUrl;
  return `${BASE_URL}/${rawUrl.replace(/^\/+/, "")}`;
};

// Placeholder constants
export const PLACEHOLDER_CAR = "https://placehold.co/400x250?text=No+Image";
export const PLACEHOLDER_CAR_SMALL = "https://placehold.co/150x100?text=Car";
export const PLACEHOLDER_CAR_TINY = "https://placehold.co/80x50?text=Car";
export const PLACEHOLDER_CAR_LARGE = "https://placehold.co/600x400?text=No+Image";
export const PLACEHOLDER_AVATAR = "https://placehold.co/120x120?text=User";

