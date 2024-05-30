import React, { useState } from 'react'
import { Box, Button, FormControlLabel, FormGroup, Switch } from '@mui/material'
import { Teams } from '@/components/play/Teams'
import { Answers } from '@/components/play/Answers'
import { Navigation } from '@/components/play/Navigation'
import { Modes, mode, showTeams, allTeamsHasAnsweredAllQuestions, allTeamsHasAnsweredTheCurrentQuestion, isTheLastTeamOnTheList, teams, activeTeamIndex } from '@/utils/misc'
import { useTimer } from '@/hooks/useTimer'



const ControlsSection: React.FC = () => {
    const [showAnswers, setShowAnswers] = useState(false)
    const { handleReset } = useTimer()
    
    const handleNewRound = () => {
		teams.value = teams.value.reverse()
		activeTeamIndex.value = 0
		handleReset()
	}

    return (
        <Box width='100%'>
            <FormGroup>
                <FormControlLabel
                    checked={showTeams.value}
                    onChange={() => showTeams.value = !showTeams}
                    control={<Switch />}
                    label={`Vis lag`}
                />
            </FormGroup>
            {showTeams && <Teams />}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                {!showAnswers &&
                    allTeamsHasAnsweredTheCurrentQuestion &&
                    isTheLastTeamOnTheList && (
                        <Button
                            sx={{ my: 2 }}
                            variant='outlined'
                            onClick={() => setShowAnswers(true)}
                        >
                            Vis svar
                        </Button>
                    )}
                {allTeamsHasAnsweredTheCurrentQuestion &&
                    isTheLastTeamOnTheList && (
                        <Button
                            color='success'
                            variant='contained'
                            sx={{ my: 2 }}
                            onClick={handleNewRound}
                        >
                            Ny runde
                        </Button>
                    )}
            </Box>
            {showAnswers && <Answers />}
            {allTeamsHasAnsweredTheCurrentQuestion &&
                isTheLastTeamOnTheList && <Navigation />}
            {allTeamsHasAnsweredAllQuestions &&
                isTheLastTeamOnTheList && (
                    <Button
                        onClick={() => {
                            mode.value = Modes.Podium
                        }}
                    >
                        Vis podium
                    </Button>
                )}
        </Box>
    )
}

export default ControlsSection
