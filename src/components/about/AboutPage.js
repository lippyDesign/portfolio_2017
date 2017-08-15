import React, { Component } from 'react';
import { Card, CardMedia } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import facePic from '../../assets/images/facePic.jpg';
import { workExperience, education, courses, technicalSkills, icons, about } from '../../items';
import SocialIcons from '../SocialIcons';
import ExperienceGraph from './ExperienceGraph';

import resume from './resume.pdf'

export default class extends Component {
  renderSkills() {
    return technicalSkills.map(({ name, image, url }) => <div className='skillItem' key={name}>
      <a target='_blank' href={url}>
        <img src={image} alt={name}/>
        <p>{name}</p>
      </a>
    </div>);
  }
  renderBigEducation() {
    return education.map(({ name, facility, date, description }) => {
      return <ListItem
        className='bigEducationItem'
        disabled
        key={name}
        primaryText={`${name}, ${description}`}
        secondaryText={`${facility}. ${date}`}
        leftIcon={<FontIcon className="fa fa-university fa-2x" />}
      />
    });
  }
  renderSmallEducation() {
    return courses.map(({ name, platform, year }) => <div className='courseItem' key={name}>
      <i className="fa fa-certificate" aria-hidden="true"></i> {name}. <span className="coursesSpan">{`${platform}, ${year}`}</span>
    </div>);
  }
  renderWorkExperience() {
    return workExperience.map(({ name, title, startDate, endDate, description }) => <div key={name} className="workExperienceItem">
      <div className="workExperienceItemHeader">
        <i className="fa fa-briefcase fa-2x" aria-hidden="true"></i>
        <span className="workDates">{`${startDate} - ${endDate}`}</span>
      </div>
      <Divider />
      <h4>{name}</h4>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>);
  }
  render() {
    return <div className='aboutPage'>
      <section className="summary">
        <Card className='aboutPicCard'>
          <CardMedia>
              <img src={facePic} alt="face portrait" />
          </CardMedia>
        </Card>
        <Paper className="aboutDescription">
          <h3>{about.name}</h3>
          <h4>{about.statement}</h4>
          <p>{about.details}</p>
          <div className="aboutSectionIcons">
            <SocialIcons icons={icons} />
          </div>
          <div className="resumeButtonWrapper">
            <RaisedButton label="Download Printable Resume" primary icon={<FontIcon className="fa fa-file-pdf-o" />} />
            <a href={resume} download="resume">Click to Download My Resume</a>
          </div>
        </Paper>
      </section>
        <Paper className="skills">
          <h3>Technical Skills</h3>
          <h4>Some Of the Technologies I Know</h4>
          <div className="skillItemsWrapper">
            {this.renderSkills()}
          </div>
        </Paper>
      <section className="educationSection">
        <Paper className="education">
          <h3>Education & Diplomas</h3>
          <h4>What I Have Done In My Academic Career</h4>
          <List>
            {this.renderBigEducation()}
          </List>
        </Paper>
        <Paper className="courses">
          <h3>Courses & Certificates</h3>
          <h4>How I Further Enhanced My Academic Knowledge</h4>
          <div className='courseItemWrapper'>
            {this.renderSmallEducation()}
          </div>
        </Paper>
      </section>
      <section className="workExperience">
        <Paper className="workExperienceGraph">
          <h3>Experience & Education Graph</h3>
          <h4>Graphic Representation of Work Experience and Education Timelines</h4>
          <div className='aboutGraphWrapper'>
            <ExperienceGraph />
          </div>
        </Paper>
        <Paper className="workExperienceWrapper">
          <h3>Work Experience</h3>
          <h4>My Previous Associations</h4>
          <div className="workExperienceSummary">
            {this.renderWorkExperience()}
          </div>
        </Paper>
      </section>
    </div>
  }
}