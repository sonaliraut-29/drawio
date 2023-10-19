/**
 * @author Sonali Raut
 * @description getCookie function.
 * This function is return value from cookie
 * Params required - name
 */

export function getCookie(name) {
  let cookieValue = null;
  if (typeof window !== "undefined") {
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
  }
  return cookieValue;
}

/**
 * @author Sonali Raut
 * @description setCookie function.
 * This function is used to set cookie with expire time
 * Params required - key, value, expireDays
 */
export function setCookie(key, value, expireDays) {
  if (typeof window !== "undefined") {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + expireDays);
    const c_value =
      escape(value) +
      (expireDays == null
        ? ""
        : "; expires=" + exdate.toUTCString() + " ; path=/");
    document.cookie = key + "=" + c_value;
  }
}

/**
 * @author Sonali Raut
 * @description deleteCookie function.
 * This function is used to delete cookie
 */

export function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
