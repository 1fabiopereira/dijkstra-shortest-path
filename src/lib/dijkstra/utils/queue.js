/**
 * @author Fábio Pereira <fabio.pereira.gti@gmail.com>
 */

class Queue {
  // Initialize keys and queue
  constructor () {
    this.keys = new Set()
    this.queue = []
  }

  // Sort the queue to have the least expensive node on first position
  sort () {
    this.queue.sort((a, b) => a.priority - b.priority)
  }

  // Set a priority for a key in the queue
  set (key, value) {
    const priority = Number(value)
    if (isNaN(priority)) {
      throw new TypeError('"priority" should be a number')
    }

    if (!this.keys.has(key)) {
      this.keys.add(key)
      this.queue.push({ key, priority })
    } else {
      this.queue.map((element) => {
        if (element.key === key) {
          Object.assign(element, { priority })
        }

        return element
      })
    }

    this.sort()
    return this.queue.length
  }

  // Removes the first element from the queue and returns it
  next () {
    const element = this.queue.shift()
    this.keys.delete(element.key)

    return element
  }

  // Check if queue is empty
  isEmpty () {
    return Boolean(this.queue.length === 0)
  }

  // Check if has key on queue
  has (key) {
    return this.keys.has(key)
  }

  // Get key form queue
  get (key) {
    return this.queue.find(element => element.key === key)
  }
}

export default Queue
