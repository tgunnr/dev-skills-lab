import { Skill } from '../models/skill.js'

async function index(req, res) {
  try {
    const skills = await Skill.find({})
    res.render('skills/index', {
      skills,
      time: req.time
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function newSkill(req, res) {
  res.render('skills/new')
}

async function create(req, res) {
  try {
    req.body.done = false
    await Skill.create(req.body)
    res.redirect('/skills')
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}

async function show(req, res) {
  try {
    const skill = await Skill.findById(req.params.skillId)
    res.render('skills/show', {
      skill
    })
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}

async function deleteSkill(req, res) {
  try {
    await Skill.findByIdAndDelete(req.params.skillId)
    res.redirect('/skills')
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}

async function edit(req, res) {
  try {
    const skill = await Skill.findById(req.params.todoId)
    res.render('skills/edit', {
      skill
    })
  } catch (error) {
    console.log(error)
    res.redirect('/skills')
  }
}

async function update(req, res) {

  req.body.done = !!req.body.done
  try {
    await Skill.findByIdAndUpdate(req.params.skillId, req.body, {new: true})
    res.redirect(`/skills/${req.params.skillId}`)
  } catch (error) {
    console.log(error)
    res.redirect(`/skills/${req.params.skillId}`)
  }
}


export {
  index,
  newSkill as new,
  create,
  show,
  deleteSkill as delete,
  edit,
  update
}