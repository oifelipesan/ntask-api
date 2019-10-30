module.exports = {
  serverErrorMessage(err, res) {
    return res.status(500).json({ error: String(err) })
  },
  notFoundMessage(err, res) {
    return res.status(404).json({ error: err })
  },
  badRequestMessage(err, res) {
    return res.status(400).json({ error: err })
  },
  successMessage(msg, res) {
    return res.status(200).json(msg)
  }
}
