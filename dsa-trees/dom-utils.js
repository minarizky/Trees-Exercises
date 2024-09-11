/** 
 * getElementById: find an element by its id.
 * @param {string} id - The id of the element.
 * @return {Element|null} - The found element or null if not found.
 */
function getElementById(id) {
    let result = null;
  
    const findElement = (elements) => {
      for (let element of elements) {
        if (element.id === id) {
          result = element;
          return;
        }
        if (element.children) {
          findElement(Array.from(element.children));
          if (result) return;
        }
      }
    };
  
    findElement([document.body]);
    return result;
  }
  
  /** 
   * getElementsByTagName: find elements by their tag name.
   * @param {string} tagName - The tag name to search for.
   * @return {Array<Element>} - The list of found elements.
   */
  function getElementsByTagName(tagName) {
    const result = [];
  
    const findElements = (elements) => {
      for (let element of elements) {
        if (element.tagName.toLowerCase() === tagName.toLowerCase()) {
          result.push(element);
        }
        if (element.children) {
          findElements(Array.from(element.children));
        }
      }
    };
  
    findElements([document.body]);
    return result;
  }
/**
 * 
 *
 * getElementsByClassName: find elements by their class name.
 * @param {string} className - The class name to search for.
 * @return {Array<Element>} - The list of found elements.
 */
function getElementsByClassName(className) {
    const result = [];
  
    const findElements = (elements) => {
      for (let element of elements) {
        if (element.classList.contains(className)) {
          result.push(element);
        }
        if (element.children) {
          findElements(Array.from(element.children));
        }
      }
    };
  
    findElements([document.body]);
    return result;
  }
  
  // Export functions for use in other modules or for testing
  module.exports = {
    getElementById,
    getElementsByTagName,
    getElementsByClassName
  };
  