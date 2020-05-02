import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { Redirect } from "react-router-dom";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class LoginTab extends React.Component {
    state = { redirect: null };

    async fakeAuth(){
      await sessionStorage.setItem("auth", true);
    }

    render() {
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        const { classes } = this.props;
        return (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >
            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <PersonIcon />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <VpnKeyIcon />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} 
                          onClick={() => {
                            this.fakeAuth()
                            this.setState({redirect: 'admin'})
                          }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
          </Grid>
        );
    }
}

export default withStyles(styles)(LoginTab);
