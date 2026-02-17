export default defineEventHandler(() => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jumpOut: 1,
        customerButtons: [
      
  { title: "Suporte via WhatsApp", url: "https://wa.me/123456789" },
  { title: "Chat ao Vivo", url: "https://example.com/live-chat" },
  { title: "Telegrama", url: "https://t.me/example_support" }

        ],
      })
    }, 1000) // this is just for test
  })
})
