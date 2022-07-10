const escapeHtml = (
   text: string,
   options: Record<'reverse', boolean>
): string => {
   const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
   }

   const reversedMap: Record<string, string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#039;': "'",
   }

   let valueToReturn = ''

   if (options.reverse) {
      valueToReturn = text.replace(
         /(&lt;)|(&amp;)|(&gt;)|(&quot;)|'&#039;'/g,
         (coincidence) => reversedMap[coincidence]
      )
   } else {
      valueToReturn = text.replace(
         /["&'<>]/g,
         (coincidence) => map[coincidence]
      )
   }

   return valueToReturn
}

export { escapeHtml }
