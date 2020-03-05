import { view } from "app/actions/BlogPage";

export class BlogPageModel {
  
  private questions: string;
  private skills: string;
  private topic: string;
  private view: number;
  private answers: string;
  private vote: number;

  constructor (
    questions,
    skills,
    topic,
    view,
    answers,
    vote
  ) {
    this.questions = questions;    
    this.skills  = skills;
    this.topic = topic;
    this.view = view;
    this.answers = answers;
    this.vote = vote;
  }
}
  