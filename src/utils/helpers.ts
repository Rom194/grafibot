import { Message } from 'discord.js'

/**
 * Envoie un message en privée ou sur le channel si les MP sont désactivés
 * @param {module:discord.js.Message} message
 * @param {string} content
 * @returns {Promise<any>}
 */
export const sendDMorReply = async function (message: Message, content: string) {
  return message.author
    .createDM()
    .then((channel) => channel.send(content))
    .catch(() => message.reply(content.split('\n')[0]))
}

/**
 * Envoie un message en privée ou sur le channel si les MP sont désactivés et supprime le message après coup
 * @param {module:discord.js.Message} message
 * @param {string} content
 * @returns {Promise<any>}
 */
export const sendDMorReplyAutoDelete = async function (message: Message, content: string) {
  return message.author
    .createDM()
    .then((channel) => channel.send(content))
    .catch(async function () {
      let reply = await message.reply(content.split('\n')[0]) as Message
      setTimeout(function () {
        reply.delete().catch()
      }, 3500)
      return
    })
}

/**
 * Renvoie les éléments de arr1 qui ne sont pas dans arr2
 * @param {T[]} arr1
 * @param {T[]} arr2
 * @returns {T[]}
 */
export const arrayDiff = function<T> (arr1: T[], arr2: T[]): T[] {
  return arr1.filter(i => arr2.indexOf(i) < 0)
}
