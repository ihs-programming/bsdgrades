import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import cheerio from 'react-native-cheerio';

import ClassRow from './ClassRow.js';
import AssignmentRow from './AssignmentRow.js';

export default class GradeScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      gradeInfo: [],
      loadedGrades: false,
      lastRefreshed: Date(),
      viewAssignments: -1,
    };
  }

  componentWillMount() {
    this.loadGrades();
  }

  render() {
    if (this.state.viewAssignments < 0) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              title="Logout"
              style={styles.backButton}
              onPress={this.props.logout} />
            <Text style={styles.gradeheader}> Grades </Text>
          </View>
          <View style={styles.gradelist}>
            {this.renderGradeList()}
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Button
              title="<-"
              style={styles.backButton}
              onPress={() => this.setState({viewAssignments: -1})} />
            <Text style={styles.assignheader}> Assignments </Text>
          </View>
          <View style={styles.assignments}>
            <ScrollView>
              {this.renderAssignmentList()}
            </ScrollView>
          </View>
        </View>
      )
    }
  }

  renderAssignmentList = () => {
    let assignments = this.state.gradeInfo[this.state.viewAssignments].assignments;
    return assignments.map((row, i) => {
      return (
        <AssignmentRow
          key={i+row.lastRefreshed}
          name={row.assignment}
          assignType={row.assignmenttype}
          date={row.date}
          points={row.points}
          score={row.score}
          scoretype={row.scoretype} />
      );
    });
  }

  renderGradeList = () => {
    if (this.state.loadedGrades) {
      return this.state.gradeInfo.map((k, i) => {
        let gradeRow = k;
        return (
          <ClassRow
            key={i + gradeRow.lastRefreshed}
            period={gradeRow.period}
            course={gradeRow.course}
            grade={gradeRow.grade}
            darken={i%2==1}
            onClick={() => this.loadAssignments(i)}/>
        );
      });
    }
    else {
      return (
        <View>
          <Text> Loading grades... </Text>
        </View>
      );
    }
  }

  loadAssignments = (index) => {
    let clsinfo = {};
    fetch(this.state.gradeInfo[index].link)
      .then(resp => {
        return resp.text();
      })
      .then(html => {
        let assignments = this.parseAssignments(html);
        let gradeInfo = this.state.gradeInfo;
        gradeInfo[index].assignments = assignments;
        this.setState({gradeInfo: gradeInfo, viewAssignments: index});
      })
      .catch(err => {
        console.log("Retrieving class information failed", err);
      });
  }

  parseAssignments = (html) => {
    let $ = cheerio.load(html);
    let assignmentTable;
    let info_tables = $('table.info_tbl');
    if (info_tables.length == 3) {
      assignmentTable = info_tables.eq(1);
    }
    else {
      assignmentTable = info_tables.eq(0);
    }
    let assignmentRows = assignmentTable.find('tr.altrow1, tr.altrow2');
    let parsedAssignments = [];

    assignmentRows.each((i, elem) => {
      const keys = [
        'date', 'assignment', 'assignmenttype', 'resources', 'score',
        'scoretype', 'points', 'notes'];
      let assignment = {};
      $(elem).children('td').each((i, assignmentElem) => {
        assignment[keys[i]] = $(assignmentElem).find('a').text();
      });
      assignment.lastRefreshed = Date();
      parsedAssignments.push(assignment);
    });
    return parsedAssignments;
  }

  loadGrades = () => {
    const CLASS_GRADE_URL='https://wa-bsd405-psv.edupoint.com/PXP_Gradebook.aspx?AGU=0';
    fetch(CLASS_GRADE_URL)
      .then(resp => {
        return resp.text();
      })
      .then(text => {
        let grades = this.parseGrades(text);
        this.setState({loadedGrades: true, lastRefreshed: Date()});
      })
      .catch(err => {
        console.log("Retrieving grades failed:", err);
      });
  }

  parseGrades = (html) => {
    const SYNERGY_BASE_URL = 'https://wa-bsd405-psv.edupoint.com/';

    let $ = cheerio.load(html);
    let classRows = $('tr.altrow1, tr.altrow2');
    let grades = [];
    classRows.each((i, elem) => {
      let cls = {assignments: []};
      let cellAttribs = [
        'period', 'course', 'resources', 'room', 'teacher', 'grade'];
      let values = $(elem).children().map((i, childElem) => {
        return $(childElem).find('a').text();
      });
      let classLinkExt = $(elem).first().find('a').attr('href');
      cls.link = SYNERGY_BASE_URL + classLinkExt;
      cls.lastRefreshed = Date();

      cellAttribs.forEach((v, i) => {
        cls[v] = values[i];
      });

      grades.push(cls);
    });
    this.setState({gradeInfo: grades});
  }
}

GradeScreen.propTypes = {
  logout: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  gradelist: {
    flex: 8,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    flex: 1,
    textAlignVertical: 'center',
  },
  gradeheader: {
    flex: 1,
    fontSize: 30,
    marginTop: 20,
    marginBottom: -10,
    textAlign: 'center',
  },
  assignments: {
    flex: 8,
    width: '100%',
  },
  assignheader: {
    flex: 7,
    fontSize: 30,
    marginTop: 20,
    marginBottom: -10,
    textAlign: 'center',
  },
});
