import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string
 * @param  {...string} inputs - Class names to combine
 * @returns {string} - Combined class names
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Formatiert einen Preis mit Euro-Symbol
 * @param {number} price - Der zu formatierende Preis
 * @returns {string} - Formatierter Preis
 */
export function formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + ' €';
}

/**
 * Verzögert eine Aktion für eine bestimmte Zeit
 * @param {number} ms - Verzögerungszeit in Millisekunden
 * @returns {Promise} - Promise, das nach der Verzögerung aufgelöst wird
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Berechnet einen Rabattpreis
 * @param {number} originalPrice - Originalpreis
 * @param {number} discountPercentage - Rabatt in Prozent
 * @returns {number} - Preis nach Rabatt
 */
export function calculateDiscountedPrice(originalPrice, discountPercentage) {
    return originalPrice * (1 - discountPercentage / 100);
}